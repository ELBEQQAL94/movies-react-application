import React from "react";

// Change title of the document
import { Helmet } from "react-helmet";

// Component
import CreateElementForm from "./CreateElementForm";

const CreateElementPageComponent = () => {
  const TITLE = "Create Element";
  return (
    <main className="main">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="container">
        <h2>Create Element</h2>
        <div className="form__container">
            <CreateElementForm />
        </div>
      </div>
    </main>
  );
};

export default CreateElementPageComponent;
