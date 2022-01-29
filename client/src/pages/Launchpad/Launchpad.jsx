import React from "react";

export default function Launchpad({ play }) {
  return (
    <div>
      <h1>Sequencer</h1>
      <button onClick={play}>Play Sound 3</button>
      {/* <audio src={info.url} id={info.keyCode} /> */}
    </div>
  );
}
