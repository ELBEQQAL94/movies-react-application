import React from 'react';
import {Route} from 'react-router-dom';

// Prop Types
import PropTypes from 'prop-types';

const AppRoute = ({
    component: Component, 
    layout: Layout, 
    ...rest
}) => {

    return (
        <Route {...rest} render={ props => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}/>
    ); 
};

AppRoute.propTypes = {
    component: PropTypes.node.isRequired,
    layout: PropTypes.node.isRequired,
};

export default AppRoute;
