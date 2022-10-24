import React from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";

const Style = {
  ClearAllButton: styled.button`
color: #b64900;
border: none;
background-color: transparent;
font-size: 2em;
transition: all 0.2s;
filter: drop-shadow(0px 0px 1px #b64900);

&:hover {
  filter: drop-shadow(0px 0px 4px #b64900);
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
