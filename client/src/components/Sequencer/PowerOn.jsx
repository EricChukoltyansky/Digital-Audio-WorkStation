import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { MdOutlineMusicNote } from "react-icons/md";

const Style = {
  PowerOn: styled.button`
    padding: 0.75em 2em;
    outline: none;
    background-color: #27ae60;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;

    &:hover {
      background: ${darken(0.2, "#27ae60")};
      cursor: pointer;
    }
  `,
};

const PowerOn = ({ onClick }) => (
  <Style.PowerOn onClick={onClick}>
    {<MdOutlineMusicNote />}
  </Style.PowerOn>
);

export default PowerOn;