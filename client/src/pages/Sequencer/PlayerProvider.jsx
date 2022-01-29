import { useState, useEffect } from "react";
import * as Tone from 'tone'

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        BD: "../../sounds/kick",
        CP: "../../sounds/snare",
        OH: "../../sounds/snap",
        CH: "../../sounds/hi-hat"
      },
      () => {
        console.log("buffers loaded");
        setPlayer(player);
      }
    ).toMaster();
  }, []);

  return children({ player });
};

export default PlayerProvider;
