import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid #fff;
  background: transparent;
  color: #fff;

  &:hover {
    background-color: #f8f8ff;
    color: #000;
  }
`;

function Instructions({ onClick }) {
  return (
    <>
      <Button onClick={onClick}>Instructions</Button>
    </>
  );
}

export default Instructions;
