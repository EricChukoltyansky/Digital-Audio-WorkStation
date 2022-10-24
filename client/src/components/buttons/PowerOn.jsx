import React from "react";
import styled from "styled-components";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const Style = {
  PowerOn: styled.button`
  color: #0b996a;
  border: none;
  background-color: transparent;
  font-size: 2em;
  transition: all 0.2s;
  filter: drop-shadow(0px 0px 1px #0b996a);

  &:hover {
    filter: drop-shadow(0px 0px 4px #0b996a);
    cursor: pointer;
  }
`,
};

const PowerOn = ({ onClick }) => (
  <Style.PowerOn onClick={onClick}>
    {<HiOutlineSpeakerWave />}
  </Style.PowerOn>
);

export default PowerOn;