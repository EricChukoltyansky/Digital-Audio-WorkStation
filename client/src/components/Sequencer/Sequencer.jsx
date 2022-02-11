import { useState, useEffect, useCallback } from "react";
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
import PowerOn from "./PowerOn";
import ClearAllButton from "./ClearAllButton";
import PowerOff from "./PowerOff";
import "./Sequencer.css";
import styled from "styled-components";

export default function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sequencerVolume, setSequencerVolume] = useState(-12);
  const [BPMcount, setBPMCount] = useState(100);
  const [, updateState] = useState();

  function refreshPage() {
    window.location.reload(false);
  }

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
          player.volume.value = sequencerVolume;
          player.player(lineMap[i]).start();
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

  const handlePowerOn = () => {
    setSequencerVolume(-60);
  };

  const handlePowerOff = () => {
    setSequencerVolume(-12);
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
      refreshPage();
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
    <div className="Sequencer">
      <Bar>
        <PlayButton
          playing={playing}
          onClick={() => handleSetPlaying(!playing)}
        />

        <StopButton onClick={handleStopPlaying} />

        <Volume
          max="4"
          min="-60"
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

        {sequencerVolume === -60 ? (
          <PowerOff onClick={handlePowerOff} />
        ) : (
          <PowerOn onClick={handlePowerOn} />
        )}

        <ClearAllButton onClick={handleClearAll} />
      </Bar>
      <Grid
        sequence={sequence}
        handleToggleStep={handleToggleStep}
        handleStopPlaying={handleStopPlaying}
      />
    </div>
  );
}
