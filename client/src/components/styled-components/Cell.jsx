import styled from "styled-components";

const getBackground = (activated, triggered, row) => {
  switch (true) {
    case activated && triggered:
      return "radial-gradient(#f8b6b6, #922c2c)";
    case activated && !triggered:
      if(row <= 5) {
        return "radial-gradient(#f3e775, #dbaf0e)";
      } else if( row > 5 && row <= 9 ) {
        return "radial-gradient(#5fed9f, #0abb07)";
      } else {
        return "radial-gradient(#2dcaed, #1d12e7)";
      }
    case !activated && triggered:
      return "rgb(158, 156, 156)";
    default:
      return "rgb(41,40,40)";
  }
};

const getBoxShadow = (activated, triggered, row) => {
  switch (true) {
    case activated && triggered:
      return "0 0 100px 50px #922c2c";
    case activated && !triggered:
      if(row <= 5) {
        return "0 0 20px 5px #dbaf0e";
      } else if( row > 5 && row <= 9 ) {
        return "0 0 20px 5px #0abb07";
      } else {
        return "0 0 20px 5px #1d12e7";
      }
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

const Cell = styled.div.attrs(({ activated, triggered, row }) => ({
  style: {
    background: getBackground(activated, triggered, row),
    boxShadow: getBoxShadow(activated, triggered, row),
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

  @media (max-width: 860px) {
    margin: 1px;
  }
`;

export default Cell;