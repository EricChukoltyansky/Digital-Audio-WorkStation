import React from "react";
// import Main from "./pages/Main/Main";
// import Join from "./pages/Join/Join";
import PlayerProvider from "./components/Sequencer/PlayerProvider";
import Sequencer from "./components/Sequencer/Sequencer";
import { io } from "socket.io-client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route path="/DAW" element={<Main socket={socket} />} />
        </Routes>
      </BrowserRouter> */}
      <PlayerProvider>
        {({ player }) => {
          if (!player) {
            return <p>loading....</p>;
          }
          return <Sequencer player={player} socket={socket} />;
        }}
      </PlayerProvider>
    </div>
  );
}

export default App;
