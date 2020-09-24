import React from 'react';

// Style
import './Footer.css';

const Footer = () => (
  <footer>
    &copy;
    {' '}
    {new Date().getFullYear()}
    {' '}
    YOUSSEF ELBEQQAL
  </footer>
);

export default Footer;
