import React, { useState, useEffect } from 'react';

// FETCH MOVIES FROM SERVER
import fetchMovies from '../../services/movies';

// Components
import Content from '../../components/content/Content';
import Spinner from '../../components/elements/Spinner';
import Filter from '../../components/filter/Filter';

const MoviesPageComponent = () => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const movies = await fetchMovies();
            if(!movies) {
                setLoading(false);
                setError(true);
            }
            setMovies(movies);
            setLoading(false);
        };
        fetchData();
    }, []);


    return(
        <main className="main">
            <div className="container">
                <Filter 
                    setFilterMovies={setFilterMovies} 
                    setLoading={setLoading} 
                    setError={setError}
                />
                {error && <p>Connection failed!</p>}
                {
                   loading ? 
                   (
                        <Spinner />
                    ) : filterMovies.length > 0 ? (
                        <Content content={filterMovies} />          
                    ) : (
                        <Content content={movies} />          
                    )
                }
            </div>
        </main>
    );
};

export default MoviesPageComponent;
