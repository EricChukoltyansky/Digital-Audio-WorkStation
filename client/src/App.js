import { useEffect } from "react";
import PlayerProvider from "./components/Sequencer/PlayerProvider";
import Sequencer from "./components/Sequencer/Sequencer";
import { io } from "socket.io-client";
import { initialState } from "./components/Sequencer/utils";

import Join from "./pages/Join/Join";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

function App() {
  const initialLocalStorage = () => {
    window.localStorage.setItem("init", JSON.stringify(initialState));
  };

  useEffect(() => {
    initialLocalStorage();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route
            path="/DAW"
            element={
              <PlayerProvider>
                {({ player }) => {
                  if (!player) {
                    return <p>loading....</p>;
                  }
                  return <Sequencer player={player} socket={socket} />;
                }}
              </PlayerProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
