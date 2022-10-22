import React from "react";
import styled from "styled-components";
import { GiDrumKit, GiGuitarBassHead } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";

const Bar = styled.div`
    height: calc(100vh - 75px);
    right: calc(100vw - 50px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
`;

const Piano = styled.h1.attrs(({pianoActive}) => ({
  style: {
    color: pianoActive ? "#dbaf0e" : "white"
  }
}))`
  &::after {
    content: '';
    height: 37.5%;
    width: calc(7vw - 35px); 
    top: 0.2%;
    left: 160%;
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: absolute;
  }
`;

const Bass = styled.h1`
  color: white;
  &::after {
    content: '';
    height: 30.5%;
    width: calc(7vw - 35px); 
    top: 38.5%;
    left: 160%;
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: absolute;
  }
`;

const Drums = styled.h1`
  color: white;
  &::after {
    content: '';
    height: 30%;
    width: calc(7vw - 35px); 
    top: 69.8%;
    left: 160%;
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: absolute;
  }
`;

export default function LeftIconBar({pianoActive}) {
  return (
    <Bar>
      <Piano pianoActive={pianoActive}>
        <CgPiano />
      </Piano>
      <Bass>
        <GiGuitarBassHead />
      </Bass>
      <Drums>
        <GiDrumKit />
      </Drums>
    </Bar>
  );
}
