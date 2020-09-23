import React from "react";

// Components
import ActiveLink from './ActiveLink';

const NavbarLinks = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <ActiveLink activeOnlyWhenExact={true} to="/" label="Movies" />
      </li>
      <li className="nav-item">
        <ActiveLink to="/tv-shows" label="Tv Shows" />
      </li>
    </ul>
  </div>
);

export default NavbarLinks;
