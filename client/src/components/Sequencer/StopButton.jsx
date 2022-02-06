import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaStop } from "react-icons/fa";

const Style = {
  StopButton: styled.button`
    padding: 0.75em 2em;
    outline: none;
    background-color: orange;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;

    &:hover {
      background: ${darken(0.2, "orange")};
      cursor: pointer;
    }
  `,
};

const StopButton = ({ onClick }) => (
  <Style.StopButton onClick={onClick}>
    <FaStop />
  </Style.StopButton>
);

export default StopButton