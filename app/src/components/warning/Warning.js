import React from "react";

// Prop Types
import PropTypes from "prop-types";

const Warning = ({ message, error, resultNotFound }) => {
  if(error) {
    return <h2>{message}</h2>;
  } else if(resultNotFound) {
    return <h2>{message}</h2>;
  } else  {
    return null;
  }
};

Warning.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
  resultNotFound: PropTypes.bool,
};

export default Warning;
