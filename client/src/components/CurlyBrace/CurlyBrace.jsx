import React from "react";
import "./CurlyBrace.scss";

export default function CurlyBrace() {
  return (
    <div style={{color: 'white', position: 'absolute'}}>
      <div style={{display: 'flex', width: '10em', justifyContent: 'center', Height: '10em'}}>
        <div className="brace-container side">
          <div className="brace r t"></div>
          <div className="brace r b"></div>
        </div>
      </div>
    </div>
  );
}
