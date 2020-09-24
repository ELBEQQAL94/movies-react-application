import React from 'react';

// props types
import PropTypes from 'prop-types';

// Components
import {Content} from '../../components';

const Home = ({selecetdOption}) => {
    return (
        <main className="main">
            <div className="container">
                <Content selecetdOption={selecetdOption} />
            </div>
        </main>
    );
};

Home.propTypes = {
    selecetdOption: PropTypes.string.isRequired,
};

export default Home;