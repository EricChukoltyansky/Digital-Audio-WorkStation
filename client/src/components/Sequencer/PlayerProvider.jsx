import { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players({
      urls: {
        BD: "/sounds/the-kick.wav",
        CP: "/more-sounds/snare.wav",
        OH: "/more-sounds/hh_open.wav",
        CH: "/more-sounds/hh_closed.wav",
        FS: "/sounds/bassFS.wav",
        EF: "/sounds/bassEF.wav",
        CS: "/sounds/bassCS.wav",
        BF: "/sounds/bassBF.wav",
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
