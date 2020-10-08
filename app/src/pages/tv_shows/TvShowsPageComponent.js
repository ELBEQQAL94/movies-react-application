import React, { useState } from "react";

import { useLocation } from "react-router-dom";

// Change title of the document
import { Helmet } from "react-helmet";

// FETCH TVSHOWS FROM SERVER
import tvShowsService from "../../services/tvShows";

// hook custom
import useContent from "../../hooks_custom/useContent";

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

  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );
  const [loading, setLoading] = useState(true);
  const [tvShows, totalPages, error] = useContent(
    tvShowsService,
    setLoading,
    searchParams
  );
  const [resultNotFound, setResultNotFound] = useState(false);

  const TITLE = "Tv Shows";

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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setLoading={setLoading}
        />
        <Warning error={error} resultNotFound={resultNotFound} />
        <Spinner loading={loading} />
        <Spinner loading={loading} />
        <Content content={tvShows} setResultNotFound={setResultNotFound} />
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
