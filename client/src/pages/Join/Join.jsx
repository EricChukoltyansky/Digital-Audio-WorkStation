import React from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "../../assets/fonts/JMH Psychedelic CAPS.otf";
import ModalPage from "../Modal/ModalPage";

const Join = () => {
  return (
    <div className="landing">
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
          <div>
            <ModalPage/>
          </div>
        </div>
        <div className="footer">
          <div>
            <p>
              Made with much love and care by: &nbsp;
              <a
                href="https://www.linkedin.com/in/idan-lev-16865917b/"
                target="_blank"
                rel="noreferrer"
              >
                Idan Lev &nbsp;
              </a>
              and &nbsp;
              <a
                href="https://www.linkedin.com/in/erikchukoltyansky-183216151/"
                target="_blank"
                rel="noreferrer"
              >
                Eric Chukoltyansky.
              </a>
              <br />
              Its respective Github &nbsp;
              <a
                href="https://github.com/EricChukoltyansky/Digital-Audio-WorkStation"
                target="_blank"
                rel="noreferrer"
              >
                repo
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
