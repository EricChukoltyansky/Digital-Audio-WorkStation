import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "../../assets/fonts/JMH Psychedelic CAPS.otf";

const Join = () => {
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join The Revolution</h1>
        <Link to={"/DAW"}>
          <button className={"button mt-20"} type="submit">
            Click <span>here</span> , it will be fun
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
