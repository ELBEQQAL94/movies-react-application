import React, { useState, useEffect } from 'react';

// FETCH TV SHOWS FROM SERVER
import fetchTvShows from '../../services/tvShows';

// Components
import Content from '../../components/content/Content';
import Spinner from '../../components/elements/Spinner';

const TvShowsPageComponent = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

  useEffect(() => {
    fetchTvShows(setTvShows, setLoading, setError);
  }, []);

  return(
    <main className="main">
        <div className="container">
            {error && <p>Connection failed!</p>}
            {
                loading ? 
                (
                    <Spinner />
                ) : (
                    <Content content={tvShows} />          
                )}
        </div>
    </main>
  );
};

export default TvShowsPageComponent;