import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Grid from "./Grid";
import * as Tone from "tone";
// import PlayerProvider from "./PlayerProvider";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

const steps = 16;
const initialCellState = { triggered: false, activated: false };
const lineMap = ["BD", "CP", "CH", "OH", "ST"];
const initialState = [
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
];

export default function Sequencer({ play }) {
  const [sequence, setSequence] = useState(initialState);
  // const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const player1 = new Tone.Player().toDestination();
  const player2 = new Tone.Player().toDestination();
  const player3 = new Tone.Player().toDestination();
  const player4 = new Tone.Player().toDestination();
  const player5 = new Tone.Player().toDestination();

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    console.log("toggled");
    setSequence(sequenceCopy);
  };

  useEffect(() => {
    const recieveMessage = (m) => {
      toggleStep(m.x, m.z);
    };
    const switchMessage = (m) => {
      setPlaying(m.tog);
    };
    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage);
  }, []);

  const handleToggleStep = (i, j) => {
    socket.emit("arm", { x: i, z: j });
  };

  const handleSetPlaying = (switcher) => {
    socket.emit("switch", { tog: switcher });
  };

  useEffect(() => {
    const nextStep = (time) => {
      for (let i = 0; i < sequence.length; i++) {
        for (let j = 0; j < sequence[i].length; j++) {
          const { triggered, activated } = sequence[i][j];
          sequence[i][j] = { activated, triggered: j === time };
          if (triggered && activated) {
            if (lineMap[i] === "BD") {
              player1.buffer = samples.get(lineMap[i]);
              player1.start();
            }
            if (lineMap[i] === "CP") {
              player2.buffer = samples.get(lineMap[i]);
              player2.start();
            }
            if (lineMap[i] === "OH") {
              player3.buffer = samples.get(lineMap[i]);
              player3.start();
            }
            if (lineMap[i] === "CH") {
              player4.buffer = samples.get(lineMap[i]);
              player4.start();
            }
            if (lineMap[i] === "ST") {
              player5.buffer = samples.get(lineMap[i]);
              player5.start();
            }
          }
        }
      }
      setSequence(sequence);
    };

    const samples = new Tone.ToneAudioBuffers({
      urls: {
        BD: "/kick.mp3",
        CP: "/snare.mp3",
        OH: "/snap.mp3",
        CH: "/hi-hat.mp3",
        ST: "/stefan.mp3",
      },
    });

    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, 100 + Math.random() * 20);
    return () => {
      clearTimeout(timer);
    };
  }, [
    currentStep,
    playing,
    sequence,
    player1,
    player2,
    player3,
    player4,
    player5,
  ]);

  return (
    <div>
      <h1>Sequencer</h1>
      <button onClick={play}>Play Sound 1</button>
      <br />
      <Bar>
        <PlayButton
          playing={playing}
          onClick={() => handleSetPlaying(!playing)}
        />
      </Bar>
      <Grid sequence={sequence} handleToggleStep={handleToggleStep} />
    </div>
  );
}
