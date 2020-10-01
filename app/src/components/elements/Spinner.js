import React from "react";

// Style
import "./Spinner.css";

const Spinner = () => (
  <div className="spinner__container">
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
