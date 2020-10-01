import React from "react";

// Prop Types
import PropTypes from "prop-types";

const Warning = ({message}) => (
    <h2>{message}</h2>
);

Warning.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Warning;