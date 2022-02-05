import { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players({
      urls: {
        BD: "/sounds/kick.wav",
        CP: "/sounds/clap.wav",
        OH: "/sounds/hh_open.wav",
        CH: "/sounds/hh_closed.wav",
      },
      onload: () => {
        console.log("buffers loaded");
        setPlayer(player);
      },
    }).toDestination();

  }, []);

  return children({ player });
};

export default PlayerProvider;
