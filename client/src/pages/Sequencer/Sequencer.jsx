import React from "react";

export default function Sequencer({ play }) {
  return (
    <div>
      <h1>Sequencer</h1>
      <button onClick={play}>Play Sound 1</button>
    </div>
  );
}
