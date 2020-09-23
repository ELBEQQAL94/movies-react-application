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
import { Header, Footer } from './components';

// Pages
import { Home } from './pages';

const Routers = () => {

  const [selecetdOption, setSelecetdOption] = useState(requests.fetchMovies);

  return (
    <Router>
      <div className="app">

        {/* HEADER */}
        <Header 
          setSelecetdOption={setSelecetdOption} 
          selecetdOption={selecetdOption} 
        />
        <Switch>
          <Route exact path='/'>
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

        {/* Footer*/}
        <Footer />
      </div>
    </Router>
  );
};

export default Routers;
