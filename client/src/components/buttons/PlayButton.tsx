import React from "react";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";

const Style = {
  PlayButton: styled.button`
    padding: 0.75em 0.9em;
    outline: none;
    background: radial-gradient(#acd4fa, #2559c2);
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;
    transition: all 0.2s;

    &:hover {
      border-radius: 50px;
      cursor: pointer;
    }
  `,
};

type PlayButtonProps = {
  playing: boolean;
  onClick: () => void;
};

const PlayButton = ({ playing, onClick }: PlayButtonProps) => (
  <Style.PlayButton onClick={onClick}>
    {playing ? <FaPause /> : <FaPlay />}
  </Style.PlayButton>
);

export default PlayButton;
