import { useState, useEffect } from "react";
import Grid from "./Grid";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";
import { pluckSynth1, pluckSynth2, pluckSynth3, baseDrum } from "./Instruments";
import { steps, lineMap, initialState } from "./utils";
import StopButton from "./StopButton";
import Volume from "./Volume";
import BPM from "./BPM";

export default function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sequencerVolume, setSequencerVolume] = useState(-12);
  const [BPMcount, setBPMCount] = useState(100);

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    setSequence(sequenceCopy);
  };

  const nextStep = (time) => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          if (lineMap[i] === "BD") {
            baseDrum.volume.value = sequencerVolume;
            baseDrum.triggerAttackRelease("B1", "25n");
          } else if (lineMap[i] === "SY1") {
            pluckSynth1.volume.value = sequencerVolume;
            pluckSynth1.triggerAttackRelease("B1");
          } else if (lineMap[i] === "SY2") {
            pluckSynth2.volume.value = sequencerVolume;
            pluckSynth2.triggerAttackRelease("C#2");
          } else if (lineMap[i] === "SY3") {
            pluckSynth3.volume.value = sequencerVolume;
            pluckSynth3.triggerAttackRelease("D2");
          } else {
            player.volume.value = sequencerVolume;
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

  const handleStopPlaying = () => {
    socket.emit("rewind");
  };

  const handleClearAll = () => {
    socket.emit("clearAll");
  };

  const handleVolume = (e) => {
    setSequencerVolume(e.target.value);
    console.log(sequencerVolume);
  };

  const handleBPM = (e) => {
    setBPMCount(e.target.value);
    console.log(BPMcount);
  };

  useEffect(() => {
    const recieveMessage = (m) => {
      toggleStep(m.x, m.z);
    };
    const switchMessage = (m) => {
      setPlaying(m.tog);
    };
    const rewindMessage = () => {
      setCurrentStep(0);
      nextStep(currentStep);
      setPlaying(false);
    };
    const clearAllMsg = () => {
      setSequence(initialState);
      setPlaying(false);
    };

    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage);
    socket.on("rewind", rewindMessage);
    socket.on("clearAll", clearAllMsg);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, BPMcount);
    console.log("setTimeOut", BPMcount);
    console.log("timer", timer);
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, playing, BPMcount]);

  return (
    <div>
      <br />
      <Bar>
        <PlayButton
          playing={playing}
          onClick={() => handleSetPlaying(!playing)}
        />
        <StopButton onClick={handleStopPlaying} />
        <Volume
          max="4"
          min="-24"
          step="2"
          type="range"
          value={sequencerVolume}
          onChange={handleVolume}
        />
        <BPM
          max="150"
          min="60"
          step="10"
          type="range"
          value={BPMcount}
          onChange={handleBPM}
        />
        {/* <ClearAllButton onClick={handleClearAll} /> */}
      </Bar>
      <Grid
        sequence={sequence}
        handleToggleStep={handleToggleStep}
        handleStopPlaying={handleStopPlaying}
      />
    </div>
  );
}
