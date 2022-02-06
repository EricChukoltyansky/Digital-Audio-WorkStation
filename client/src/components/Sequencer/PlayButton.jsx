import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaPlay, FaPause } from "react-icons/fa";

const Style = {
  PlayButton: styled.button`
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

const PlayButton = ({ playing, onClick }) => (
  <Style.PlayButton onClick={onClick}>
    {playing ? <FaPause /> : <FaPlay />}
  </Style.PlayButton>
);

export default PlayButton;

// export default ({ playing, onClick }) => (
//   <Button onClick={onClick}>{playing ? <FaPause/> : <FaPlay/>}</Button>
// );
