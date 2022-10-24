import React from "react";
import styled from "styled-components";

const Style = {
  BPM: styled.input`
    -webkit-appearance: none;
    margin-bottom: 15px;
    cursor: pointer;
    width: 15%;
    border-radius: 20px;
    direction: rtl;
    margin: 0.5em;

    &::-webkit-slider-runnable-track {
      height: 2px;
      background: #646464;
      border: none;
      border-radius: 22%;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 25px;
      width: 25px;
      border-radius: 7px;
      background: radial-gradient(rgb(121, 231, 238), rgb(3, 154, 168));
      box-shadow: 0px 0px 3px rgb(3, 154, 168);
      margin-top: -11.5px;
      transition: all 0.2s;
    }

    &::-webkit-slider-thumb:hover {
      box-shadow: 0px 0px 10px rgb(3, 154, 168);
      border-radius: 20px;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `,
};

const BPM = ({ max, min, step, type, value, onChange }) => (
  <Style.BPM
    max={max}
    min={min}
    step={step}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export default BPM;
