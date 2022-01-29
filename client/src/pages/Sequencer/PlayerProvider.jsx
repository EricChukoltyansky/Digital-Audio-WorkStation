import { useState, useEffect } from "react";
import * as Tone from 'tone'

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        BD: "/kick",
        CP: "/snare",
        OH: "/snap",
        CH: "/hi-hat"
      },
      () => {
        console.log("buffers loaded");
        setPlayer(player);
      }
    ).toDestination();
  }, []);

  return children({ player });
};

export default PlayerProvider;
