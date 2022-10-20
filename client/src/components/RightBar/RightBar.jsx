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

  const Inst = styled.div`
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: calc(5vh - 2vh);
  `
  return (
  <div>
    <Bar>
      <Inst>F#</Inst>
      <Inst>E</Inst>
      <Inst>C#</Inst>
      <Inst>A</Inst>
      <Inst>F#</Inst>
      <Inst>F#</Inst>
      <Inst>E</Inst>
      <Inst>C#</Inst>
      <Inst>B</Inst>
      <Inst>OP-HAT</Inst>
      <Inst>HI-HAT</Inst>
      <Inst>SNARE</Inst>
      <Inst>KICK</Inst>
    </Bar>
  </div>
  );
}
