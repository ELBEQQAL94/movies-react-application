import React, { useState, useEffect } from 'react';

// FETCH MOVIES FROM SERVER
import fetchMovies from '../../services/movies';

// Components
import Content from '../../components/content/Content';
import Spinner from '../../components/elements/Spinner';

const MoviesPageComponent = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

  useEffect(() => {
    fetchMovies(setMovies, setLoading, setError);
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
                        <Content content={movies} />          
                    )}
            </div>
        </main>
    );
};

export default MoviesPageComponent;
