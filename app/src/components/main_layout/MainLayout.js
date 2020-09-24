import React from 'react';

// Prop Types
import PropTypes from 'prop-types';

// HEADER
import Header from '../header/Header';

// FOOTER
import Footer from '../footer/Footer';

const MainLayout = ({children}) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;