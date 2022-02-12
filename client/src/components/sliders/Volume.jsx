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
      height: 7px;
      background: #ddd;
      border: none;
      border-radius: 5px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 35px;
      width: 35px;
      border-radius: 7px;
      background: radial-gradient(rgb(217, 189, 250), rgb(172, 6, 97));
      margin-top: -14px;
      transition: all 0.2s;
    }

    &::-webkit-slider-thumb:hover {
      border-radius: 20px;
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
