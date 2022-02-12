import React from "react";
import "./Rotate.css";
import { FiRotateCw } from "react-icons/fi";

const Rotate = () => {
  return (
    <div className="overlay">
      <div className="iconContainer">
        <div className="phone">
          <p>
            <FiRotateCw />
          </p>
        </div>
      </div>
    </div>
  );
};


export default Rotate;


