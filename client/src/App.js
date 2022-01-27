import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import audioFile from "./music.mp3";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Launchpad from "./pages/Launchpad/Launchpad";
import SavedProjects from "./pages/SavedProjects/SavedProjects";
import Sequencer from "./pages/Sequencer/Sequencer";
import SignIn from "./pages/SignIn/SignIn";
import Synth from "./pages/Synth/Synth";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

const audio = new Audio();

function App() {
  // const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");

  useEffect(() => {
    const recieveMessage = (m) => {
      console.log(m);
      // if (role === "ying") {
        audio.src = m.path;
        audio.play();
      // }
      setPlaying(m.name);
    };

    const stopAudio = () => {
      setPlaying("");
    };

    socket.on("play", recieveMessage);
    socket.on("stop", stopAudio);

    return () => {
      socket.off("play", { name: "Test sound 1", path: audioFile });
    };
  }, []);

  useEffect(() => {
    const handleAudioStop = () => {
      socket.emit("stop");
    };
    audio.addEventListener("pause", handleAudioStop);
    return () => {
      audio.removeEventListener("pause", handleAudioStop);
    };
  }, []);

  const handlePlaySound = () => {
    socket.emit("play", { name: "Test sound 1", path: audioFile });
  };

  return (
    <div className="App">
      <h1>Soundbutt</h1>
      <div>
        <h4>Role</h4>
        {/* <button onClick={() => setRole("yang")}>Yang</button> */}
        {/* <button onClick={() => setRole("ying")}>Ying</button> */}
      </div>
      <div>
        <h4>Choose sound</h4>
        <button onClick={handlePlaySound}>Play Sound!</button>
      </div>
      <div>
        <h4>Playing {playing}</h4>
      </div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/sequencer" element={<Sequencer/>}/>
        <Route path="/synth" element={<Synth/>}/>
        <Route path="/launchpad" element={<Launchpad/>}/>
        <Route path="/savedProjects" element={<SavedProjects/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
