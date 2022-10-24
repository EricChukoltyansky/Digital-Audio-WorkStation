import React from "react";
import styled from "styled-components";
import { CiPlay1, CiPause1 } from "react-icons/ci";

const Play = styled.button`
  color: #0abb07;
  border: none;
  background-color: transparent;
  font-size: 2em;
  transition: all 0.2s;
  filter: drop-shadow(0px 0px 1px #0abb07);

  &:hover {
    filter: drop-shadow(0px 0px 4px #0abb07);
    cursor: pointer;
  }
`;

const Pause = styled.button`
  color: #922c2c;
  border: none;
  background-color: transparent;
  font-size: 2em;
  transition: all 0.2s;
  filter: drop-shadow(0px 0px 1px #922c2c);

  &:hover {
    filter: drop-shadow(0px 0px 4px #922c2c);
    cursor: pointer;
  }
`;

export default function PlayButton({ playing, onClick }) {
  return (
    <>
      {playing ? (
        <Pause onClick={onClick}>
          <CiPause1 />
        </Pause>
      ) : (
        <Play onClick={onClick}>
          <CiPlay1 />
        </Play>
      )}
    </>
  );
}
