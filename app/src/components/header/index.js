import React from 'react';

// Types
import PropTypes from "prop-types";

// Components
import Navbar from './Navbar';


// Style
import './index.css';

const Header = ({setSelecetdOption}) => {
    return (
        <header className="main__header">
            <div className="container">

                {/* Navbar */}
                <Navbar 
                    setSelecetdOption={setSelecetdOption} 
                />
                
            </div>
        </header>
    );
};

Header.propTypes = {
    setSelecetdOption: PropTypes.func.isRequired,
};

export default Header;
