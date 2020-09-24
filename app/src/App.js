import React from "react";

// react router
import { BrowserRouter as Router, Switch } from "react-router-dom";

// routes 
import { APP_ROUTES } from './routes/routes';

// App Route
import AppRoute from "./AppRoute";

// Style
import "./App.css";

const App = () => (
  <Router>
    <div className="app">
      <Switch>
        {APP_ROUTES.map(({ id, exact, path, component, layout }) => (
          <AppRoute
            key={id}
            exact={exact}
            path={path}
            component={component}
            layout={layout}
          />
        ))}
      </Switch>
    </div>
  </Router>
);

export default App;
