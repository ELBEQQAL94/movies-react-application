import React from 'react'

// Prop Types
import PropTypes from "prop-types";

// Style
import "./ErrorMessage.css";

const ErrorMessage = ({error, message}) => {
    if(error) {
        return (
            <p className="error">{message}</p>
        );
    };
    return null;
};

ErrorMessage.propTypes = {
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  };

export default ErrorMessage;
