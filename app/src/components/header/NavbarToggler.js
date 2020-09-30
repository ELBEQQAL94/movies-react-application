import React from "react";

const NavbarToggler = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <svg
      viewBox="0 0 24 24"
      width="52"
      height="52"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="css-i6dzq1"
    >
      <line x1="21" y1="10" x2="3" y2="10" />
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="14" x2="3" y2="14" />
      <line x1="21" y1="18" x2="3" y2="18" />
    </svg>
  </button>
);

export default NavbarToggler;
