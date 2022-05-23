import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
const Style = {
  ClearAllButton: styled.button`
    padding: 0.75em 0.9em;
    outline: none;
    background: radial-gradient(#f8b6b6, #922c2c);
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

type ClearAllButtonProps = {
  onClick: () => void;
};

const ClearAllButton = ({ onClick }: ClearAllButtonProps) => (
  <Style.ClearAllButton onClick={onClick}>
    <FaTrashAlt />
  </Style.ClearAllButton>
);

export default ClearAllButton;
