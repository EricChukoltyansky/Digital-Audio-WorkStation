import React from "react";
import Chat from "./components/Chat/Chat";
import Join from "./pages/Join/Join";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import audioFile from "./sounds/music.mp3";
// import audioFile2 from "./sounds/funky-dan-mk2.mp3";
// import audioFile3 from "./sounds/blues.wav";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Launchpad from "./pages/Launchpad/Launchpad";
// import SavedProjects from "./pages/SavedProjects/SavedProjects";
import Sequencer from "./pages/Sequencer/Sequencer";
// import SignIn from "./pages/SignIn/SignIn";
// import Synth from "./pages/Synth/Synth";
import PlayerProvider from "./pages/Sequencer/PlayerProvider";

// const socket = io.connect(
//   process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
// );

// const audio1 = new Audio();
// const audio2 = new Audio();
// const audio3 = new Audio();

function App() {
  // const [role, setRole] = useState("");
  // const [playing1, setPlaying1] = useState("");
  // const [playing2, setPlaying2] = useState("");
  // const [playing3, setPlaying3] = useState("");

  // useEffect(() => {
  //   const recieveMessage = (m) => {
  //     console.log(m);
  //     if (m.path === audioFile) {
  //     audio1.src = m.path;
  //     audio1.play();
  //     setPlaying1(m.name);
  //     }
  //     if (m.path === audioFile2) {
  //     audio2.src = m.path;
  //     audio2.play();
  //     setPlaying2(m.name);
  //     }
  //     if (m.path === audioFile3) {
  //     audio3.src = m.path;
  //     audio3.play();
  //     setPlaying3(m.name);
  //     }
  //   };

  //   const stopAudio = () => {
  //     setPlaying1("");
  //     setPlaying2("");
  //     setPlaying3("");
  //   };

  //   socket.on("play", recieveMessage);
  //   socket.on("stop", stopAudio);

  //   return () => {
  //     socket.off("play", { name: "Test sound 1", path: audioFile });
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleAudioStop = () => {
  //     socket.emit("stop");
  //   };
  //   audio1.addEventListener("pause", handleAudioStop);
  //   audio2.addEventListener("pause", handleAudioStop);
  //   audio3.addEventListener("pause", handleAudioStop);
  //   return () => {
  //     audio1.removeEventListener("pause", handleAudioStop);
  //     audio2.removeEventListener("pause", handleAudioStop);
  //     audio3.removeEventListener("pause", handleAudioStop);
  //   };
  // }, []);

  // const handlePlaySound = () => {
  //   socket.emit("play", { name: "Test sound 1", path: audioFile });
  // };
  // const handlePlaySound2 = () => {
  //   socket.emit("play", { name: "Test sound 2", path: audioFile2 });
  // };
  // const handlePlaySound3 = () => {
  //   socket.emit("play", { name: "Test sound 3", path: audioFile3 });
  // };

  // const play = (keyCode, sound) => {
  //   if (!keyCode || !sound || !power || volume === "0") return;
  //   setSoundName(sound);
  //   const audio = document.getElementById(keyCode);
  //   audio.currentTime = 0;
  //   audio.play();
  //   pressed(audio);
  // };

  return (
    <div className="App">
      <h1>That is DAWp!</h1>
      {/* <div>
        <h4>Role</h4>
        <button onClick={() => setRole("yang")}>Yang</button>
        <button onClick={() => setRole("ying")}>Ying</button>
      </div>
      <div>
        <h4>Choose sound</h4>
        <button onClick={handlePlaySound}>Play Sound!</button>
        <button onClick={handlePlaySound2}>Play Sound2!</button>
        <button onClick={handlePlaySound3}>Play Sound3!</button>
      </div>
      <div>
        <h4>Playing {playing1}</h4>
        <h4>Playing {playing2}</h4>
        <h4>Playing {playing3}</h4>
      </div> */}
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sequencer" element={<Sequencer play={handlePlaySound} />} />
          <Route path="/synth" element={<Synth play={handlePlaySound2}/>} />
          <Route path="/launchpad" element={<Launchpad play={handlePlaySound3}/>} />
          <Route path="/savedProjects" element={<SavedProjects />} />
        </Routes>
      </BrowserRouter> */}
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
      <PlayerProvider>
        {({ player }) => {
          if (!player) {
            return <p>loading....</p>;
          }
          return <Sequencer player={player} />;
        }}
      </PlayerProvider>
    </div>
  );
}

export default App;
