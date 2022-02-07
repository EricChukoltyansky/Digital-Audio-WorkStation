import { useState, useEffect } from "react";
import Grid from "./Grid";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";
import {
  Synth1,
  Synth2,
  Synth3,
  Synth4,
  Synth5,
  Synth6,
  Synth7,
  Synth8,
  Synth9,
} from "./Instruments";
import { steps, lineMap, initialState } from "./utils";
import StopButton from "./StopButton";
import Volume from "./Volume";
import BPM from "./BPM";
import ClearAllButton from "./ClearAllButton";

export default function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sequencerVolume, setSequencerVolume] = useState(-12);
  const [power, setPower] = useState(true);
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
          if (lineMap[i] === "SY1") {
            Synth1.volume.value = sequencerVolume;
            Synth1.triggerAttackRelease("D1", "20n");
          } else if (lineMap[i] === "SY2") {
            Synth2.volume.value = sequencerVolume;
            Synth2.triggerAttackRelease("F1", "20n");
          } else if (lineMap[i] === "SY3") {
            Synth3.volume.value = sequencerVolume;
            Synth3.triggerAttackRelease("G1", "20n");
          } else if (lineMap[i] === "SY4") {
            Synth4.volume.value = sequencerVolume;
            Synth4.triggerAttackRelease("A1", "20n");
          } else if (lineMap[i] === "SY5") {
            Synth5.volume.value = sequencerVolume;
            Synth5.triggerAttackRelease("C2", "20n");
          } else if (lineMap[i] === "SY6") {
            Synth6.volume.value = sequencerVolume;
            Synth6.triggerAttackRelease("D2", "20n");
          } else if (lineMap[i] === "SY7") {
            Synth7.volume.value = sequencerVolume;
            Synth7.triggerAttackRelease(["D3","A3","D4"], "14n");
          } else if (lineMap[i] === "SY8") {
            Synth8.volume.value = sequencerVolume;
            Synth8.triggerAttackRelease(["E3","B3","E4"], "14n");
          } else if (lineMap[i] === "SY9") {
            Synth9.volume.value = sequencerVolume;
            Synth9.triggerAttackRelease(["F3","C4","F4"], "14n");
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
  };

  const handleBPM = (e) => {
    socket.emit("BPM", { value: e.target.value });
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
      console.log(initialState);
      // setSequence(initialState);
      setPlaying(false);
    };

    const BPMmessage = (m) => {
      setBPMCount(m.value);
    };

    socket.on("arm", recieveMessage);
    socket.on("switch", switchMessage);
    socket.on("rewind", rewindMessage);
    socket.on("clearAll", clearAllMsg);
    socket.on("BPM", BPMmessage);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, BPMcount);

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
