import React, { useState, useEffect } from "react";

// Service
import { instance, BASE_IMG_URL } from "../../services";

// Types
import PropTypes from "prop-types";

// Components
import VideoCard from "./VideoCard";

// Material UI Spinner
import { Spinner } from "../elements";

// styles
import "./index.css";

const Content = ({ selecetdOption }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await instance.get(selecetdOption);
        setContent(response.data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }

    fetchContent();
  }, [selecetdOption]);

  const renderContent = () => (
    <section className="main__content">
      <div className="row">
        {error && <p>Connection failed!</p>}
        {loading ? (
          <Spinner />
        ) : (
          content?.map((movie) => (
            <VideoCard
              key={movie.id}
              movie={movie}
              baseImgUrl={BASE_IMG_URL}
            />
          ))
        )}
      </div>
    </section>
  );

  return ( renderContent() );
};

Content.propTypes = {
  selecetdOption: PropTypes.string.isRequired,
};

export default Content;
