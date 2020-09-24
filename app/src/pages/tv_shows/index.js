import React from 'react';

// props types
import PropTypes from 'prop-types';

// Components
import {Content} from '../../components';

const TvShows = ({selecetdOption}) => {
    return (
        <main className="main">
            <div className="container">
                <Content selecetdOption={selecetdOption} />
            </div>
        </main>
    );
};

TvShows.propTypes = {
    selecetdOption: PropTypes.string.isRequired,
};

export default TvShows;