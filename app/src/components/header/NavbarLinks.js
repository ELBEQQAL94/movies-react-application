import React from "react";

// Types
import PropTypes from "prop-types";

// requests
import {requests} from '../../services';

// Components
import ActiveLink from './ActiveLink';

const NavbarLinks = ({setSelecetdOption}) => {

  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li 
          className="nav-item" 
          onClick={() => setSelecetdOption(requests.fetchMovies)}
        >
          <ActiveLink 
            activeOnlyWhenExact={true} 
            to="/" 
            label="Movies" 
          />
        </li>
        <li 
          className="nav-item"
          onClick={() => setSelecetdOption(requests.fetchTvShows)}
        >
          <ActiveLink to="/tv-shows" label="Tv Shows"/>
        </li>
      </ul>
    </div>
  );
};

NavbarLinks.propTypes = {
  setSelecetdOption: PropTypes.func.isRequired,
};

export default NavbarLinks;
