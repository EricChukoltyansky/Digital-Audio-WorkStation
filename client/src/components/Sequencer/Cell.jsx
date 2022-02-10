import styled, { keyframes } from "styled-components";

const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return "radial-gradient(#f8b6b6, #922c2c)";
    case activated && !triggered:
      return "radial-gradient(#fffb00, #e7a712)";
    case !activated && triggered:
      return "rgb(212, 212, 212)";
    default:
      return "rgb(41,40,40)";
  }
};

const getBoxShadow = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return "0 0 100px 50px #922c2c";
    case activated && !triggered:
      return "0 0 20px 5px #e7a712";
      case !activated && triggered:
        return "0 0 3px 1px rgb(212, 212, 212)";
    default:
      return "none";
  }
};

const getBorder = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return "none";
    case activated && !triggered:
      return "none";
    case !activated && triggered:
      return "none";
    default:
      return "solid 2px grey";
  }
};

// const breatheAnimation = keyframes`
//  0% { height: 80px; width: 80px; }
//  30% { height: 85px; width: 85px; opacity: 1; }
//  60% { height: 90px; width: 90px; opacity: 0.3; }
//  100% { height: 80px; width: 80px; opacity: 0.6; }
// `;

const Cell = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: getBackground(activated, triggered),
    boxShadow: getBoxShadow(activated, triggered),
    border: getBorder(activated, triggered)
  },
}))`
  border-radius: 4px;
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  margin: 5px;
  transition: all 0.1s;

  &:hover {
    border-radius: 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin: 1px;
  }
`;

export default Cell;

// animation: ${(props) =>
//   props.activated && props.triggered ? breatheAnimation : null}
// 0.1s linear;
