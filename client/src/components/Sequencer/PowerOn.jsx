import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { ImVolumeMedium } from "react-icons/im";

const Style = {
  PowerOn: styled.button`
  padding: 0.75em 0.90em;
  outline: none;
  background-color: ${darken(0.2, "#27ae60")};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  margin: 0.5em;
  transition: all 0.2s;

  &:hover {
    background: #27ae60;
    border-radius: 50px;
    cursor: pointer;
  }
`,
};

const PowerOn = ({ onClick }) => (
  <Style.PowerOn onClick={onClick}>
    {<ImVolumeMedium />}
  </Style.PowerOn>
);

export default PowerOn;