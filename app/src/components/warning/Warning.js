import React from "react";

// Prop Types
import PropTypes from "prop-types";

const Warning = ({ error, resultNotFound }) => {
  if(error) {
    return <h2>Connection Faild.</h2>;
  } else if(resultNotFound) {
    return <h2>Results Not Found.</h2>;
  } else  {
    return null;
  }
};

Warning.propTypes = {
  error: PropTypes.bool,
  resultNotFound: PropTypes.bool,
};

export default Warning;
