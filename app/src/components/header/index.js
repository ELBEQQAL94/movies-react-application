import React from 'react';

// Components
import Navbar from './Navbar';

// Style
import './index.css';

const Header = () => {
    return (
        <header className="main__header">
            <div className="container">

                {/* Navbar */}
                <Navbar />
                
            </div>
        </header>
    );
};

export default Header;
