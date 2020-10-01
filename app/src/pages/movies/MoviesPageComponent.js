import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// SORT MOVIES FROM SERVER
import moviesService from "../../services/movies";

// Components
import Content from "../../components/content/Content";
import Spinner from "../../components/elements/Spinner";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/pagination/Pagination";

// Style
import "./MoviesPageComponent.css";

const MoviesPageComponent = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const params = searchParams.toString();
    moviesService(params)
      .then(({ results, total_pages }) => {
        if (isMounted) {
          setTotalPages(total_pages);
          setMovies(results);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [
    location,
    setTotalPages,
    setMovies,
    setLoading,
    setError,
  ]);

  return (
    <main className="main">
      <div className="container">
        <Filter setCurrentPage={setCurrentPage} />
        {error && <p>Connection failed!</p>}
        {loading ? (
          <div className="spinner__container">
            <Spinner />
          </div>
        ) : (
          movies && movies.length > 0 ? (
            <>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
              <Content content={movies} />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          ) : ( <h2> Results Not Found!</h2>)
        )}
      </div>
    </main>
  );
};

export default MoviesPageComponent;
