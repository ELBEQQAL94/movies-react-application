import React from "react";

// Types
import PropTypes from "prop-types";

// Components
import Logo from './Logo';
import NavbarToggler from './NavbarToggler';
import NavbarLinks from './NavbarLinks';

// Style
import "./Navbar.css";

const Navbar = ({setSelecetdOption}) => {
  return (
    <nav className="navbar navbar-expand-lg">

      {/* Logo */}
      <Logo />

      {/* Navbar Toggler*/}
      <NavbarToggler />

      {/* Navbar Links */}
      <NavbarLinks 
        setSelecetdOption={setSelecetdOption} 
      />
      
    </nav>
  );
};

Navbar.propTypes = {
  setSelecetdOption: PropTypes.func.isRequired,
};

export default Navbar;
