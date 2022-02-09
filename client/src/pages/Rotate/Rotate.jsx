import React from "react";
import "./Rotate.css";

const Rotate = () => (
  <div className="overlay">
    <div className="iconContainer">
      <div className="phone">
        <div className="i.fa.fa-repeat"></div>
        <p>Please rotate your phone!</p>
      </div>
    </div>
  </div>
);

// .overlay
// 	.iconContainer
// 		.phone
// 			i.fa.fa-repeat
// 		p Rotate your device!
// h1 Resize the screen!
// span.pull &#x2190; Pull left

export default Rotate;
