import React from "react";

// Style
import "./Collapse.css";

const Collapse = ({ children }) => {
  return (
    <div className="mb-4">
      <button
        className="btn btn-primary"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Filter
      </button>
      <div className="collapse" id="collapseExample">
        {children}
      </div>
    </div>
  );
};

export default Collapse;
