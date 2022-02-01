import { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players({
      urls: {
        BD: "/kick.wav",
        CP: "/clap.wav",
        OH: "/hh_open.wav",
        CH: "/hh_closed.wav",
        ST: "/stefan.mp3",
      },
      onload: () => {
        console.log("buffers loaded");
        setPlayer(player);
      },
    }).toDestination();
    console.log(player);
  }, []);

  return children({ player });
};

export default PlayerProvider;
