import { useState, useEffect } from "react";
import * as Tone from "tone";

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players({
      urls: {
        BD: "/sounds/the-kick.wav",
        CP: "/sounds/snare.wav",
        OH: "/sounds/hh_open.wav",
        CH: "/sounds/hh_closed.wav",
        FS: "/sounds/bassFS.wav",
        EF: "/sounds/bassEF.wav",
        CS: "/sounds/bassCS.wav",
        BF: "/sounds/bassBF.wav",
        CATHFS: "/sounds/catHighFS.wav",
        CATEF: "/sounds/catEF.wav",
        CATCS: "/sounds/catCS.wav",
        CATAF: "/sounds/catAF.wav",
        CATFS: "/sounds/catFS.wav",
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
