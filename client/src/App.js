import React from "react";
import Chat from "./pages/Chat/Chat";
import Join from "./pages/Join/Join";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sequencer from "./pages/Sequencer/Sequencer";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001",
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
