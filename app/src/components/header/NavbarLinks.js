import React from "react";

// Components
import ActiveLink from './ActiveLink';

const NavbarLinks = () => {

  // Handle Fetch Request
  const handleOption = (name) => {
    console.log("name: ", name);
  };

  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item" onClick={() => handleOption('movies')}>
          <ActiveLink 
            activeOnlyWhenExact={true} 
            to="/" 
            label="Movies" 
          />
        </li>
        <li className="nav-item" onClick={() => handleOption('tv-shows')} >
          <ActiveLink to="/tv-shows" label="Tv Shows"/>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLinks;
