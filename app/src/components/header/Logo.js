import React from 'react';

// react router
import { Link } from 'react-router-dom';

// Style
import './Logo.css';

const Logo = () => (
    <div className="logo__container">
        <Link to="/">
            <img 
                src="https://www.prophethacker.com/wp-content/uploads/2016/09/imdb.jpg" 
                alt="logo" 
                title="logo"
            />
        </Link>
    </div>
);

export default Logo;