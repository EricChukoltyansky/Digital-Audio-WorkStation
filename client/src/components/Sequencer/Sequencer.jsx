import { useState, useEffect } from "react";
import Grid from "./Grid";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";
import { pluckSynth1, pluckSynth2, pluckSynth3, baseDrum } from "./Instruments";
import { steps, lineMap, initialState } from "./utils";
import StopButton from "./StopButton";

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

  const nextStep = (time) => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          if (lineMap[i] === "BD") {
            baseDrum.triggerAttackRelease("B1", "25n");
          } else if (lineMap[i] === "SY1") {
            pluckSynth1.triggerAttackRelease("B1");
          } else if (lineMap[i] === "SY2") {
            pluckSynth2.triggerAttackRelease("C#2");
          } else if (lineMap[i] === "SY3") {
            pluckSynth3.triggerAttackRelease("D2");
          } else {
            player.player(lineMap[i]).start();
          }
        }
      }
    }
    setSequence(sequence);
  };

  const handleToggleStep = (i, j) => {
    socket.emit("arm", { x: i, z: j });
  };

  const handleSetPlaying = (switcher) => {
    socket.emit("switch", { tog: switcher });
  };

  const handleStopPlaying = (number, switcher) => {
    socket.emit("rewind", { num: number, tog: switcher });
  };

  useEffect(() => {
    const recieveMessage = (m) => {
      toggleStep(m.x, m.z);
    };
    const switchMessage = (m) => {
      setPlaying(m.tog);
    };
    const rewindMessage = (m) => {
      setCurrentStep(m.num);
      nextStep(currentStep);
      setPlaying(false);
      setCurrentStep(0);
    };
    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage);
    socket.on("rewind", rewindMessage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        console.log("currentStep", currentStep);
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
        console.log(currentStep);
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
        <PlayButton
          playing={playing}
          onClick={() => handleSetPlaying(!playing)}
        />
        <StopButton onClick={() => handleStopPlaying()} />
      </Bar>
      <Grid
        sequence={sequence}
        handleToggleStep={handleToggleStep}
        handleStopPlaying={handleStopPlaying}
      />
    </div>
  );
}
