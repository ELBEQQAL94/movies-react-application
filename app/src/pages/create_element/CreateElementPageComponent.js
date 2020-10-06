import React from "react";

// Change title of the document
import { Helmet } from "react-helmet";

const CreateElementPageComponent = () => {
  const TITLE = "Create Element";
  return (
    <main className="main">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <div className="container">
            <h2>Create Element</h2>
        </div>
    </main>
  );
};

export default CreateElementPageComponent;
