import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import audioFile from "./music.mp3";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

const audio = new Audio();

function App() {
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");

  useEffect(() => {
    const recieveMessage = (m) => {
      console.log(m);
      if (role === "ying") {
        audio.src = m.path;
        audio.play();
      }
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
  }, [role]);

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
        <button onClick={() => setRole("yang")}>Yang</button>
        <button onClick={() => setRole("ying")}>Ying</button>
      </div>
      <div>
        <h4>Choose sound</h4>
        <button onClick={handlePlaySound}>Play Sound!</button>
      </div>
      <div>
        <h4>Playing {playing}</h4>
      </div>
    </div>
  );
}

export default App;
