import React, { useState } from 'react';

// react router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Services
import { requests } from './services';

// Components
import { Header } from './components';

// Pages
import { Home } from './pages';

const Routers = () => {

  const [selecetdOption, setSelecetdOption] = useState(requests.fetchMovies);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Header 
              setSelecetdOption={setSelecetdOption} 
              selecetdOption={selecetdOption} 
            />
            <Home selecetdOption={selecetdOption} />
          </Route>
          <Route path='/tv-shows'>
            <Header 
              setSelecetdOption={setSelecetdOption} 
              selecetdOption={selecetdOption}
            />
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
