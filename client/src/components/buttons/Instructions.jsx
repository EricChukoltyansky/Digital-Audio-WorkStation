import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  box-shadow: 0px 0px 2px #fff;
  text-shadow: 0px 0px 2px #fff;
  font-size: 1.4rem;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  font-family: "Fuzzy Bubbles", cursive;
  cursor: pointer;

  &:hover {
    color: #000;
    background-color: #f8f8ff;
    box-shadow: 0px 0px 5px #fff;
    text-shadow: 0px 0px 5px #000;
  }
`;

function Instructions({ onMouseEnter, onMouseLeave }) {
  return (
    <>
      <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        Instructions
      </Button>
    </>
  );
}

export default Instructions;
