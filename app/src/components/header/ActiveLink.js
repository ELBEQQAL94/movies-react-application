import React from 'react';

// react router
import { Link, useRouteMatch } from 'react-router-dom';

// prop types
import PropTypes from 'prop-types';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <Link className={`nav-link ${match ? 'active__link' : ''}`} to={to}>
      {label}
    </Link>
  );
};

ActiveLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired,
};

export default ActiveLink;