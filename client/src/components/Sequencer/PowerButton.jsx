import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { MdOutlineMusicNote, MdMusicOff } from "react-icons/md";

const Style = {
  PowerButton: styled.button`
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

const PowerButton = ({ power, onClick }) => (
  <Style.PowerButton onClick={onClick}>
    {power ? <MdOutlineMusicNote /> : <MdMusicOff />}
  </Style.PowerButton>
);

export default PowerButton;