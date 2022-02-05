import { useState, useEffect } from "react";
import Grid from "./Grid";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";
import { pluckSynth1, pluckSynth2, pluckSynth3, baseDrum } from "./Instruments";
import { steps, lineMap, initialState, initialCellState, init } from "./utils";
import StopButton from "./StopButton";
import ClearAllButton from "./ClearAllButton";

export default function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  console.log(initialState);

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    console.log(sequenceCopy);
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

  const handleClearAll= (state) => {
    socket.emit("clearAll", { init: state });
  };

  useEffect(() => {
    const recieveMessage = (m) => {
      toggleStep(m.x, m.z);
    };
    const switchMessage = (m) => {
      setPlaying(m.tog);
    };
    const rewindMessage = (m) => {
      console.log(m);
      if (!m.tog) {
        setCurrentStep(m.num);
        setPlaying(m.tog);
        // setPlaying(false);
      } else {
        return;
      }
    };
    const clearAllMsg = (m) => {
      setSequence(init)
      console.log(sequence);
    }
    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage);
    socket.on("rewind", rewindMessage);
    socket.on("clearAll", clearAllMsg);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        // console.log("currentStep", currentStep);
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
        // console.log(currentStep);
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
        <StopButton
          playing={playing}
          onClick={() => handleStopPlaying(0, false)}
        />
        <ClearAllButton
          onClick={() => handleClearAll(initialState)}
        />
      </Bar>
      <Grid sequence={sequence} handleToggleStep={handleToggleStep} />
    </div>
  );
}
