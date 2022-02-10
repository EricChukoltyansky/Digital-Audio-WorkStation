import styled from "styled-components";

const Frame = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  width: 75vw;
  height: calc(100vh - 75px);
`;

export default Frame;
