import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// Change title of the document
import { Helmet } from "react-helmet";

// FETCH TVSHOWS FROM SERVER
import tvShowsService from "../../services/tvShows";

// Components
import Content from "../../components/content/Content";
import Spinner from "../../components/elements/Spinner";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/pagination/Pagination";
import Warning from "../../components/warning/Warning";

const TvShowsPageComponent = () => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [tvShows, setTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const TITLE = "Tv Shows";


  useEffect(() => {
    let isMounted = true;
    const params = searchParams.toString();
    tvShowsService(params)
      .then(({ results, total_pages }) => {
        if (isMounted) {
          setTotalPages(total_pages);
          setTvShows(results);
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
  }, [location, setTotalPages, setTvShows, setLoading, setError]);

  return (
    <main className="main">
      <div className="container">
        <Filter setCurrentPage={setCurrentPage} />
        <Warning error={error} message="Connection failed!" />
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        {loading ? (
          <Spinner />
        ) : tvShows && tvShows.length > 0 ? (
          <>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
            <Content content={tvShows} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          <Warning message="Results Not Found!" />
        )}
      </div>
    </main>
  );
};

export default TvShowsPageComponent;
