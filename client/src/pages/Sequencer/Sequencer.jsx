import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Grid from "./Grid";
// import * as Tone from "tone";
// import PlayerProvider from "./PlayerProvider";
import Bar from "./Nav-Bar";
import PlayButton from "./PlayButton";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

const steps = 16;
const initialCellState = { triggered: false, activated: false };
const lineMap = ["BD", "CP", "CH", "OH", "ST", 'SY'];
const initialState = [
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
];

export default function Sequencer({ player, synth }) {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // const player1 = new Tone.Player().toDestination();
  // const player2 = new Tone.Player().toDestination();
  // const player3 = new Tone.Player().toDestination();
  // const player4 = new Tone.Player().toDestination();
  // const player5 = new Tone.Player().toDestination();

  // const audio1 = new Audio("/kick.wav");
  // const audio2 = new Audio("/clap.wav");
  // const audio3 = new Audio("/hh_open.wav");
  // const audio4 = new Audio("/hh_closed.wav");
  // const audio5 = new Audio("/stefan.mp3");

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
            synth.triggerAttackRelease("C4", "8n");
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
    // const nextStep = (time) => {
    //   for (let i = 0; i < sequence.length; i++) {
    //     for (let j = 0; j < sequence[i].length; j++) {
    //       const { triggered, activated } = sequence[i][j];
    //       sequence[i][j] = { activated, triggered: j === time };
    //       if (triggered && activated) {
    //         if (lineMap[i] === "BD") {
    //           // player1.buffer = samples.get(lineMap[i]);
    //           audio1.play();
    //         }
    //         if (lineMap[i] === "CP") {
    //           // player2.buffer = samples.get(lineMap[i]);
    //           audio2.play();
    //         }
    //         if (lineMap[i] === "OH") {
    //           // player3.buffer = samples.get(lineMap[i]);
    //           audio3.play();
    //         }
    //         if (lineMap[i] === "CH") {
    //           // player4.buffer = samples.get(lineMap[i]);
    //           audio4.play();
    //         }
    //         if (lineMap[i] === "ST") {
    //           // player5.buffer = samples.get(lineMap[i]);
    //           audio5.play();
    //         }
    //       }
    //     }
    //   }
    //   setSequence(sequence);
    // };

    // const samples = new Tone.ToneAudioBuffers({
    //   urls: {
    //     BD: "/kick.mp3",
    //     CP: "/snare.mp3",
    //     OH: "/snap.mp3",
    //     CH: "/hi-hat.mp3",
    //     ST: "/stefan.mp3",
    //   },
    //   onload: () => console.log("loaded"),
    // });

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
      <h1>Sequencer</h1>
      {/* <button onClick={play}>Play Sound 1</button> */}
      <br />
      <Bar>
        <PlayButton playing={playing} onClick={() => handleSetPlaying(!playing)} />
      </Bar>
      <Grid sequence={sequence} handleToggleStep={handleToggleStep} />
    </div>
  );
}
