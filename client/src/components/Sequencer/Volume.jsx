import React from "react";
import styled from "styled-components";

const Style = {
  Volume: styled.input`
    -webkit-appearance: none;
    margin-bottom: 15px;
    cursor: pointer;
    width: 15%;
    border-radius: 20px;

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
      background: rgb(119, 19, 233);
      margin-top: -14px;
      transition: all 0.3s;
    }

    &::-webkit-slider-thumb:hover {
      background: rgb(119, 19, 233);
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
