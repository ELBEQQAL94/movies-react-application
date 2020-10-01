import React from "react";

// Prop Types
import PropTypes from "prop-types";

const Warning = ({ message, error }) => {
  if(error) {
    return <h2>{message}</h2>;
  }
  return null;
};

Warning.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Warning;
