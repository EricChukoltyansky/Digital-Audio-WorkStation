import React from "react";
import styled from "styled-components";
import { FaStop } from "react-icons/fa";

const Style = {
  StopButton: styled.button`
    padding: 0.75em 0.90em;
    outline: none;
    background: radial-gradient(#e5b1f5, #66069e);
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

type StopButtonProps = {
  onClick: () => void;
  
};

const StopButton = ({ onClick }: StopButtonProps) => (
  <Style.StopButton onClick={onClick}>
    <FaStop />
  </Style.StopButton>
);

export default StopButton