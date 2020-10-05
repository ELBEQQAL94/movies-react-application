import React from "react";

// Prop Types
import PropTypes from "prop-types";

// Style
import "./Spinner.css";

const Spinner = ({ loading }) => {
  if (loading) {
    return (
      <div className="spinner__container">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  return null;
};

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
