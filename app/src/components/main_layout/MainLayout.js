import React from 'react';

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

export default MainLayout;