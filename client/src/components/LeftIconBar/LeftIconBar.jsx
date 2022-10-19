import React from "react";
import styled from "styled-components";
import { GiDrumKit, GiGuitarBassHead } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";

const Bar = styled.div`
    height: calc(100vh - 75px);
    right: calc(100vw - 50px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
`;

const Head = styled.h1`
  color: white;
`;

export default function LeftIconBar() {
  return (
    <Bar>
      <Head>
        <CgPiano />
      </Head>
      <Head>
        <GiGuitarBassHead />
      </Head>
      <Head>
        <GiDrumKit />
      </Head>
    </Bar>
  );
}
