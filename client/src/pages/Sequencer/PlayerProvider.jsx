import { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players({
      urls: {
        BD: "/kick.mp3",
        CP: "/snare.mp3",
        OH: "/snap.mp3",
        CH: "/hi-hat.mp3",
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
