import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// Change title of the document
import { Helmet } from "react-helmet";

// SORT MOVIES FROM SERVER
import moviesService from "../../services/movies";

// Components
import Content from "../../components/content/Content";
import Spinner from "../../components/elements/Spinner";
import Collapse from "../../components/collapse/Collapse";
import Filter from "../../components/filter/Filter";
import SortFilter from "../../components/sort_filter/SortFilter";
import Pagination from "../../components/pagination/Pagination";
import Warning from "../../components/warning/Warning";

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

  const TITLE = "Movies";

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
  }, [location, setTotalPages, setMovies, setLoading, setError]);

  return (
    <main className="main">
      <div className="container">
        <Collapse>
          <div className="filter__container">
            <form>
              <SortFilter />
              <Filter setCurrentPage={setCurrentPage} />
            </form>
          </div>
        </Collapse>
        <Warning error={error} message="Connection failed!" />
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        {loading ? (
          <Spinner />
        ) : movies && movies.length > 0 ? (
          <>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Content content={movies} />
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
        ) : (
          <Warning resultNotFound message="Results Not Found!" />
        )}
      </div>
    </main>
  );
};

export default MoviesPageComponent;
