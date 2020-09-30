import React from "react";

// react router
import { Link, useRouteMatch } from "react-router-dom";

// prop types
import PropTypes from "prop-types";

const CustomeLink = ({ label, to, activeOnlyWhenExact }) => {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link className={`nav-link ${match ? "active__link" : ""}`} to={to}>
      {label}
    </Link>
  );
};

CustomeLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
};

export default CustomeLink;
