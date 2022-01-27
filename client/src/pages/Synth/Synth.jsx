import React from "react";

export default function Synth({ play }) {
  return (
    <div>
      <h1>Sequencer</h1>
      <button onClick={play}>Play Sound 2</button>
    </div>
  );
}
