import React from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";

const Style = {
  ClearAllButton: styled.button`
color: #922c2c;
border: none;
background-color: transparent;
font-size: 2em;
transition: all 0.2s;
filter: drop-shadow(0px 0px 1px #922c2c);

&:hover {
  filter: drop-shadow(0px 0px 4px #922c2c);
  cursor: pointer;
}
  `,
};

const ClearAllButton = ({ onClick }) => (
  <Style.ClearAllButton onClick={onClick}>
    <IoTrashOutline />
  </Style.ClearAllButton>
);

export default ClearAllButton;
