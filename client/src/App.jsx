import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import PlayerProvider from "./components/context/PlayerProvider";
import Sequencer from "./components/Sequencer/Sequencer";
import Loader from "./pages/Loader/Loader";
import Rotate from "./pages/Rotate/Rotate";
import { createGlobalStyle } from "styled-components";
import "./App.css";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001"
);

function App() {
  const [orientation, setOrientation] = useState(window.screen.orientation.type);

  useEffect(() => {
    const handleOrientationChange = () =>
      setOrientation(window.screen.orientation.type);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, []);

  const GlobalStyle = createGlobalStyle`
    body {
      font-family: 'Nunito', sans-serif;
    }
  `

  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PlayerProvider>
                {({ player }) => {
                  if (!player) {
                    return <Loader />;
                  }
                  return orientation === "portrait-primary" ? (
                    <Rotate />
                  ) : (
                    <Sequencer player={player} socket={socket} />
                  );
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