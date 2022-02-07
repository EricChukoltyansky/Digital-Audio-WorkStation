import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { ImVolumeMute2 } from "react-icons/im";

const Style = {
  PowerOff: styled.button`
    padding: 0.75em 2em;
    outline: none;
    background-color: red;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;

    &:hover {
      background: ${darken(0.2, "red")};
      cursor: pointer;
    }
  `,
};

const PowerOff = ({ onClick }) => (
  <Style.PowerOff onClick={onClick}>
    <ImVolumeMute2 />
  </Style.PowerOff>
);

export default PowerOff;
