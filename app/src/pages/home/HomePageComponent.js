import React from "react";

// Change title of the document
import { Helmet } from "react-helmet";

const HomePageComponent = () => {
  const TITLE = "Home";
  return (
    <main className="main">
      <div className="container">
        <h1>Hello Home!</h1>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
      </div>
    </main>
  );
};

export default HomePageComponent;
