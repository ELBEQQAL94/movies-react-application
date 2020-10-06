import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// Change title of the document
import { Helmet } from "react-helmet";

// SORT MOVIES FROM SERVER
import moviesService from "../../services/movies";

// FETCH NEW ELEMENTS FROM FIRESTORE 
import { fetchNewElements } from "../../services/firebase";

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
  const [newMovies, setNewMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resultNotFound, setResultNotFound] = useState(false);

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

    fetchNewElements("movie")
          .then((snapshot) => {
            let data = [];
            snapshot.forEach((doc) => {
              data.push({
                uid: doc.id,
                ...doc.data(),
              });
            });
            setNewMovies(data);
          })
          .catch((err) => console.log("err", err));

    return () => {
      isMounted = false;
    };
  }, [location, setError, setLoading, setMovies, setTotalPages]);

  console.log('new movies: ', newMovies);

  return (
    <main className="main">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="container">
        <Collapse>
          <div className="filter__container">
            <form>
              <SortFilter setLoading={setLoading} />
              <Filter setCurrentPage={setCurrentPage} setLoading={setLoading} />
            </form>
          </div>
        </Collapse>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          setLoading={setLoading}
        />
        <Warning error={error} resultNotFound={resultNotFound} />
        <Spinner loading={loading}/>
        <Content content={movies} setResultNotFound={setResultNotFound}/>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          setLoading={setLoading} 
        />
      </div>
    </main>
  );
};

export default MoviesPageComponent;
