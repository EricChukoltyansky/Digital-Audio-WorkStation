import React from "react";
import styled from "styled-components";

const Style = {
  Volume: styled.input`
    -webkit-appearance: none;
    margin-bottom: 15px;
    cursor: pointer;
    width: 15%;
    border-radius: 20px;
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
      background: radial-gradient(#bbe9d9, #0b996a);
      box-shadow: 0px 0px 3px #0b996a;
      margin-top: -11.5px;
      transition: all 0.2s;
    }

    &::-webkit-slider-thumb:hover {
      border-radius: 20px;
      box-shadow: 0px 0px 10px #0b996a;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  `,
};

const Volume = ({ max, min, step, type, value, onChange }) => (
  <Style.Volume
    max={max}
    min={min}
    step={step}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export default Volume;
