import styled, { keyframes } from "styled-components";

const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return "#f6f606";
    case activated && !triggered:
      return "#8b0000";
    case !activated && triggered:
      return "#909090";
    default:
      return "#1c1c1e";
  }
};

const breatheAnimation = keyframes`
 0% { height: 80px; width: 80px; }
 30% { height: 90px; width: 90px; opacity: 1; }
 60% { height: 115px; width: 115px; opacity: 0.3; }
 100% { height: 80px; width: 80px; opacity: 0.6; }
`;

const jumpAnimation = keyframes`
0% { height: 50px; width: 50px; }
100% { height: 10px; width: 10px; }
`;

const Cell = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: getBackground(activated, triggered),
  },
}))`
  border-radius: 4px;
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  margin: 5px;
  animation: ${(props) =>
      props.activated && props.triggered ? breatheAnimation : null}
    0.1s linear;
`;

export default Cell;
