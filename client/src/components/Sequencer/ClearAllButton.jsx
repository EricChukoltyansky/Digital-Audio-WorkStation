import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { FaTrashAlt } from "react-icons/fa";
const Style = {
  ClearAllButton: styled.button`
    padding: 0.75em 2em;
    outline: none;
    background-color: red;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1em;
    margin: 0.5em;

    &:hover {
      background: ${darken(0.2, "red")};
      cursor: pointer;
    }
  `,
};

const ClearAllButton = ({ onClick }) => (
  <Style.ClearAllButton onClick={onClick}>
    <FaTrashAlt />
  </Style.ClearAllButton>
);

export default ClearAllButton