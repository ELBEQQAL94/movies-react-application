import React from "react";

// Prop Types
import PropTypes from "prop-types";

const ProgressBar = ({ progress, show }) => {
  if (show) {
    return (
      <div className="progress mb-4" style={{ height: "1px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    );
  }
  return null;
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ProgressBar;
