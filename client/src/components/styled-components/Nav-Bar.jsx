import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
`;

const NavBar = ({ children }) => <Bar>{children}</Bar>;

export default NavBar;
