import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaStop } from "react-icons/fa";

const Style = {
  StopButton: styled.button`
    padding: 0.75em 0.90em;
    outline: none;
    background-color: ${darken(0.2, "orange")};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;
    transition: all 0.3s;

    &:hover {
      background: orange;
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