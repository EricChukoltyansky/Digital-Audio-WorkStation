import React from "react";
import "./Rotate.css";
import { FiRotateCw } from "react-icons/fi";

const Rotate = () => {
  return (
    <div className="overlay">
      <div className="iconContainer">
        <div className="phone">
          <p><FiRotateCw/></p>
        </div>
      </div>
    </div>
  );
};

// .overlay
// 	.iconContainer
// 		.phone
// 			i.fa.fa-repeat
// 		p Rotate your device!
// h1 Resize the screen!
// span.pull &#x2190; Pull left

export default Rotate;