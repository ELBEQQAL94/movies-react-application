import React from "react";

// Components
import Logo from "./Logo";
import NavbarToggler from "./NavbarToggler";
import NavbarLinks from "./NavbarLinks";

// Style
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg">
    {/* Logo */}
    <Logo />

    {/* Navbar Toggler */}
    <NavbarToggler />

    {/* Navbar Links */}
    <NavbarLinks />
  </nav>
);

export default Navbar;
