import styled, { keyframes } from "styled-components";

const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return "#f6f606";
    case activated && !triggered:
      return "#8b0000";
    case !activated && triggered:
      return "rgb(223, 198, 168)";
    default:
      return "rgb(41,40,40)";
  }
};

const breatheAnimation = keyframes`
 0% { height: 80px; width: 80px; }
 30% { height: 85px; width: 85px; opacity: 1; }
 60% { height: 90px; width: 90px; opacity: 0.3; }
 100% { height: 80px; width: 80px; opacity: 0.6; }
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
  transition: all 0.2s;
`;

export default Cell;

// animation: ${(props) =>
//   props.activated && props.triggered ? breatheAnimation : null}
// 0.1s linear;
