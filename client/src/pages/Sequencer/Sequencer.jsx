import { useState, useEffect } from "react";
import Grid from "./Grid";
import * as Tone from "tone";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";

const steps = 16;
const initialCellState = { triggered: false, activated: false };
const lineMap = ["BD", "CP", "CH", "OH", 'SY'];
const initialState = [
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
];

const synth = new Tone. PluckSynth().toDestination();

export default function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    console.log("toggled");
    setSequence(sequenceCopy);
  };

  const nextStep = time => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          if (lineMap[i] === "SY") {
            synth.triggerAttackRelease("B1");
          } else {
          player.player(lineMap[i]).start();
          }
        }
      }
    }
    setSequence(sequence);
  };
  
    const handleToggleStep = (i, j) => {
      socket.emit("arm", {x: i, z: j});
    };
  
    const handleSetPlaying = (switcher) => {
      socket.emit("switch", {tog: switcher});
    };

  useEffect(() => {
    const recieveMessage = (m) => {
      toggleStep(m.x, m.z);
    }
    const switchMessage = (m) => {
      setPlaying(m.tog)
    }
    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, 100 + Math.random() * 20);
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, playing]);

  return (
    <div>
      <br />
      <Bar>
        <PlayButton playing={playing} onClick={() => handleSetPlaying(!playing)} />
      </Bar>
      <Grid sequence={sequence} handleToggleStep={handleToggleStep} />
    </div>
  );
}
