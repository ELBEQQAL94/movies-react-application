import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

// Components
import Content from '../../components/content/Content';
import Spinner from '../../components/elements/Spinner';
import Filter from '../../components/filter/Filter';
import PaginationComponent from '../../components/pagination/PaginationComponent';

// Style
import './MoviesPageComponent.css';

const MoviesPageComponent = () => {

    let location = useLocation();
    let searchParams = new URLSearchParams(location.search); 

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(+searchParams.get('page') || 1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return(
        <main className="main">
            <div className="container">
                <Filter 
                    setMovies={setMovies} 
                    setLoading={setLoading} 
                    setError={setError}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setTotalPages={setTotalPages}
                />
                {error && <p>Connection failed!</p>}
                {
                   loading ? 
                   (
                        <div className="spinner__container">
                            <Spinner />
                        </div>
                    ) : movies.length > 0 && (
                        <>
                            <PaginationComponent 
                                currentPage={currentPage} 
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                            <Content content={movies} />
                            <PaginationComponent 
                                currentPage={currentPage} 
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />          
                        </>
                    )
                }       
            </div>
        </main>
    );
};

export default MoviesPageComponent;