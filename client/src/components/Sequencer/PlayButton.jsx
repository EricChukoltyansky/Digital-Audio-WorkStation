import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaPlay, FaPause } from "react-icons/fa";

const Style = {
  PlayButton: styled.button`
    padding: 0.75em 0.90em;
    outline: none;
    background-color: ${darken(0.2, "blue")};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;
    transition: all 0.3s;

    &:hover {
      background: blue;
      cursor: pointer;
    }
  `,
};

const PlayButton = ({ playing, onClick }) => (
  <Style.PlayButton onClick={onClick}>
    {playing ? <FaPause /> : <FaPlay />}
  </Style.PlayButton>
);

export default PlayButton;