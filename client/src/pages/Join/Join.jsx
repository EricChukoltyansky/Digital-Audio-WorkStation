import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join The Revolution</h1>
        <Link to={"/DAW"}>
          <button className={"button mt-20"} type="submit">
            Click it, it will be fun
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
