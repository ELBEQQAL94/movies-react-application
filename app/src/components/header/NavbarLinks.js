import React from "react";

// Components
import CustomeLink from "./ActiveLink";

const NavbarLinks = () => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <CustomeLink activeOnlyWhenExact to="/" label="Home" />
      </li>
      <li className="nav-item">
        <CustomeLink to="/movies" label="Movies" />
      </li>
      <li className="nav-item">
        <CustomeLink to="/tv-shows" label="Tv Shows" />
      </li>
      <li className="nav-item">
        <CustomeLink to="/create-element" label="Create Element" />
      </li>
    </ul>
  </div>
);

export default NavbarLinks;
