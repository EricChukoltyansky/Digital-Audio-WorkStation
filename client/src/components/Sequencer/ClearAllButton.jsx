import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaTrashAlt } from "react-icons/fa";
const Style = {
  ClearAllButton: styled.button`
    padding: 0.75em 0.9em;
    outline: none;
    background-color: ${darken(0.2, "red")};
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;
    transition: all 0.2s;

    &:hover {
      background: red;
      border-radius: 50px;
      cursor: pointer;
    }
  `,
};

const ClearAllButton = ({ onClick }) => (
  <Style.ClearAllButton onClick={onClick}>
    <FaTrashAlt />
  </Style.ClearAllButton>
);

export default ClearAllButton;
