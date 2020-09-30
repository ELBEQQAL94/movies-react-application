import React from "react";

// Prop Types
import PropTypes from "prop-types";

// HEADER
import Header from "../header/Header";

// FOOTER
import Footer from "../footer/Footer";

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
