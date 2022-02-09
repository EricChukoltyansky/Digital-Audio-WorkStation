import React from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "../../assets/fonts/JMH Psychedelic CAPS.otf";

const Join = () => {
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <Link to={"/DAW"}>
          <h1 className="heading">
            <i className="fa fa-play fa-2x"></i>
          </h1>
        </Link>
        <div className={"sub mt-20"} type="submit">
          Click <span>play</span> , it will be fun
        </div>
      </div>
    </div>
  );
};

export default Join;
