import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Components
import { Header } from './components';

// Pages
import { Home } from './pages';

const Routers = () => {

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route path='/tv-shows'>
            <Header />
            <h1>
                Tv Shows
            </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routers;
