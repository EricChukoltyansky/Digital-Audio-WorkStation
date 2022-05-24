import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader">
    <div className="bm-pl">
      <div className="bm-pl__blob bm-pl__blob--r"></div>
      <div className="bm-pl__blob bm-pl__blob--g"></div>
      <div className="bm-pl__blob bm-pl__blob--b"></div>
    </div>
  </div>
);

export default Loader;
