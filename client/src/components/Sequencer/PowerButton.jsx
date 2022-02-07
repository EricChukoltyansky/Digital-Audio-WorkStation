import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import { MdOutlineMusicNote, MdMusicOff } from "react-icons/md";

const Style = {
  On: styled.button`
  height: 45px;
  width: 45px;
  font-size: 30px;
  border: 6px solid;
  background-color: rgba(8, 8, 8, 0.829);
  border-color: rgb(119, 207, 119);
  color: rgb(119, 207, 119);
  border-radius: 10%;
  transition: all 0.3s;
  `,
  Off: styled.button`
  height: 45px;
  width: 45px;
  font-size: 30px;
  border: 6px solid;
  border-radius: 50%;
  transition: all 0.3s;
  background-color: rgba(8, 8, 8, 0.829);
  border-color: rgb(177, 57, 57);
  `
};

const PowerButton = ({ sequencerVolume, onClick }) => (
  <Style.PowerButton onClick={onClick}>
    {power ? <MdOutlineMusicNote /> : <MdMusicOff />}
  </Style.PowerButton>
);

export default PowerButton;