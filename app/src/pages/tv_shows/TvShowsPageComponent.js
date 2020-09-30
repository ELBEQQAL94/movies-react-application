import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

// SORT MOVIES FROM SERVER
import tvShowsService from "../../services/tvShows";

// add query
import { addQuery } from "../../utils";

// Components
import Content from "../../components/content/Content";
import Spinner from "../../components/elements/Spinner";
import Filter from "../../components/filter/Filter";
import Pagination from "../../components/pagination/Pagination";

// Style
import "./TvShowsPageComponent.css";

const TvShowsPageComponent = () => {
  let history = useHistory();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [tvShows, setTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      const { results, total_pages } = await tvShowsService(
        searchParams.toString()
      );
      if (!results) {
        setLoading(false);
        setError(true);
      } else {
        if (isMounted) {
          addQuery("page", currentPage, location, history);
          setTotalPages(total_pages);
          setTvShows(results);
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [
    searchParams,
    currentPage,
    setTotalPages,
    setTvShows,
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
          tvShows.length > 0 && (
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
          )
        )}
      </div>
    </main>
  );
};

export default TvShowsPageComponent;
