import React, { useState, useEffect } from "react";
import { steps, lineMap, initialState } from "./initial";
import Grid from "../styled-components/Grid";
import Bar from "../styled-components/Nav-Bar";
import PlayButton from "../buttons/PlayButton";
import StopButton from "../buttons/StopButton";
import Volume from "../sliders/Volume";
import BPM from "../sliders/BPM";
import PowerOn from "../buttons/PowerOn";
import ClearAllButton from "../buttons/ClearAllButton";
import PowerOff from "../buttons/PowerOff";
import "./Sequencer.css";
import LeftIconBar from "../LeftIconBar/LeftIconBar";
import RightBar from "../RightBar/RightBar";
import Instructions from "../buttons/Instructions";

const deepCopyInitialState = JSON.parse(JSON.stringify(initialState));

function Sequencer({ player, socket }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sequencerVolume, setSequencerVolume] = useState(-12);
  const [BPMcount, setBPMCount] = useState(100);
  const [stopped, setStopped] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [pianoActive, setPianoActive] = useState(false);
  const [bassActive, setBassActive] = useState(true);
  const [drumsActive, setDrumsActive] = useState(true);

  const leftBarLights = (line, step) => {
    const sequenceCopy = [...sequence];
    const { activated } = sequenceCopy[line][step];
    console.log("activated", activated);
    console.log("line", line);
    console.log("step", step);
    for (let i = 0; i < sequenceCopy[line].length; i++) {
      if (activated && line < 5) {
        setPianoActive(true);
      } else if (activated && line >= 5 && line < 10) {
        setBassActive(true);
      } else if (activated && line >= 10) {
        setDrumsActive(true);
      } else {
        setPianoActive(false);
      }
    }
  };

  const resetSequence = () => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        if (triggered || activated) {
          sequence[i][j] = { activated: false, triggered: false };
        }
      }
    }
    setSequence(sequence);
  };

  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    setSequence(sequenceCopy);
    leftBarLights(line, step);
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

  const handleStopPlaying = (switcher) => {
    socket.emit("rewind", { tog: switcher });
  };

  const handleReset = () => {
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
    const toggleMessage = (m) => {
      toggleStep(m.x, m.z);
    };
    const playPauseMessage = (m) => {
      setPlaying(m.tog);
      if (stopped) {
        setCurrentStep(0);
        nextStep(currentStep);
      }
      setStopped(false);
      console.log(playing);
    };
    const stopMessage = (m) => {
      setPlaying(false);
      setStopped(m.tog);
    };
    const resetMessage = () => {
      resetSequence();
      setCurrentStep(0);
      setPlaying(false);
    };

    const BPMmessage = (m) => {
      setBPMCount(m.value);
    };

    socket.on("arm", toggleMessage);
    socket.on("switch", playPauseMessage);
    socket.on("rewind", stopMessage);
    socket.on("clearAll", resetMessage);
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
  }, [currentStep, playing, BPMcount, sequence, stopped]);

  return (
    <div className="Sequencer">
      <Bar>
        <PlayButton
          playing={playing}
          onClick={() => handleSetPlaying(!playing)}
        />

        <StopButton onClick={() => handleStopPlaying(true)} />

        <BPM
          max="150"
          min="60"
          step="10"
          type="range"
          value={BPMcount}
          onChange={handleBPM}
        />

        <Volume
          max="4"
          min="-60"
          step="2"
          type="range"
          value={sequencerVolume}
          onChange={handleVolume}
        />

        {sequencerVolume === -60 ? (
          <PowerOff onClick={handlePowerOff} />
        ) : (
          <PowerOn onClick={handlePowerOn} />
        )}

        <ClearAllButton onClick={handleReset} />
        <Instructions
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        />
      </Bar>
      <RightBar />
      <LeftIconBar
        pianoActive={pianoActive}
        bassActive={bassActive}
        drumsActive={drumsActive}
      />
      <Grid
        sequence={sequence}
        handleToggleStep={handleToggleStep}
        handleStopPlaying={handleStopPlaying}
      />
      {isShown && (
        <div className="instructions">
          <h1>Instructions</h1>
          <p>
            Left Side: First 5 rows are keyboards. Middle 4 rows are basses.
            Last 4 rows are drums.
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(Sequencer);
