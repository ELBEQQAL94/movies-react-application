import React from 'react';

// react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// HEADER
import Header from './components/header/Header';

// Footer
import Footer from './components/footer/Footer';

// Pages
import HomePageComponent from './pages/home/HomePageComponent';
import TvShowsPageComponent from './pages/tv_shows/TvShowsPageComponent';
import MoviesPageComponent from './pages/movies/MoviesPageComponent';
import NotFoundPageComponent from './pages/page_not_found/NotFoundPageComponent';
const Routers = () => {

  return (
    <Router>
      <div className="app">

        {/* HEADER */}
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePageComponent />
          </Route>
          <Route exact path="/tv-shows">
            <TvShowsPageComponent />
          </Route>
          <Route exact path="/movies">
            <MoviesPageComponent />
          </Route>

          {/* Page Not Found! */}
          <Route path="*">
            <NotFoundPageComponent />
          </Route>
        </Switch>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default Routers;
