import styled from "styled-components";
import { darken } from "polished";

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

const Cell = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: getBackground(activated, triggered),
  },
}))`
  border-radius: 4px;
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  margin: 2px;
`;

export default Cell;
