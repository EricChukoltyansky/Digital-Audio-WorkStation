import React from "react";
import styled from "styled-components";

export default function RightBar() {
  const Bar = styled.div`
    height: calc(100vh - 75px);
    left: calc(100vw - 12vw);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
  `;

  const Piano = styled.div`
    color: #dbaf0e;
    font-family: "Fuzzy Bubbles", cursive;
    font-size: calc(5vh - 2vh);
    filter: drop-shadow(0px 0px 1px #dbaf0e);
  `

  const Bass = styled.div`
    color: #0abb07;
    font-family: "Fuzzy Bubbles", cursive;
    font-size: calc(5vh - 2vh);
    filter: drop-shadow(0px 0px 1px #0abb07);
  `

  const Drums = styled.div`
    color: #1272e7;
    font-family: "Fuzzy Bubbles", cursive;
    font-size: calc(5vh - 2vh);
    filter: drop-shadow(0px 0px 1px #1272e7);
  `

  return (
  <div>
    <Bar>
      <Piano>F#</Piano>
      <Piano>E</Piano>
      <Piano>C#</Piano>
      <Piano>A</Piano>
      <Piano>F#</Piano>
      <Bass>F#</Bass>
      <Bass>E</Bass>
      <Bass>C#</Bass>
      <Bass>B</Bass>
      <Drums>OP-HAT</Drums>
      <Drums>HI-HAT</Drums>
      <Drums>SNARE</Drums>
      <Drums>KICK</Drums>
    </Bar>
  </div>
  );
}
