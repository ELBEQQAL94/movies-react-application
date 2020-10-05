import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// Change title of the document
import { Helmet } from "react-helmet";

// FETCH TVSHOWS FROM SERVER
import tvShowsService from "../../services/tvShows";

// Components
import Content from "../../components/content/Content";
import Spinner from "../../components/elements/Spinner";
import Collapse from "../../components/collapse/Collapse";
import Filter from "../../components/filter/Filter";
import SortFilter from "../../components/sort_filter/SortFilter";
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
  const [resultNotFound, setResultNotFound] = useState(false);

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
  }, [location, setError, setLoading, setTvShows, setTotalPages]);

  return (
    <main className="main">
      <div className="container">
        <Collapse>
          <div className="filter__container">
            <form>
              <SortFilter setLoading={setLoading} />
              <Filter setCurrentPage={setCurrentPage} setLoading={setLoading} />
            </form>
          </div>
        </Collapse>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setLoading={setLoading}
        />
        <Warning error={error} resultNotFound={resultNotFound}/>
        <Spinner loading={loading}/>
        <Spinner loading={loading}/>
        <Content content={tvShows} setResultNotFound={setResultNotFound}/>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setLoading={setLoading}
        />
      </div>
    </main>
  );
};

export default TvShowsPageComponent;
