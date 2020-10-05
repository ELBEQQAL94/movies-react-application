import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

// utils
import { setYears, setQueryToUrl } from "../../utils";

// Components
import SelectOption from "./SelectOption";

const Filter = ({ setCurrentPage, setLoading }) => {
  let history = useHistory();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  // filter object
  const [filter, setFilter] = useState({
    language: searchParams.get("language") || "en",
    year: searchParams.get("year") || "2020",
  });

  // languages
  const options = ["en", "es", "fr", "ar"];

  // generate years from 1994
  const years = setYears();

  // handle filter
  const onFilterChange = (e) => {
    const { name, value } = e.target;
    // set filter
    setFilter({ ...filter, [name]: value });
    if (name === "language"){
      // add query
      setQueryToUrl(name, value, location, history);
      // show spinner
      setLoading(true);
    }else {
      setCurrentPage(1)
      // add query
      setQueryToUrl(name, value, location, history);
      // show spinner
      setLoading(true);
    };
  };

  return (
    <>
      <SelectOption
        filter={filter.language}
        name="language"
        onFilterChange={onFilterChange}
        options={options}
      />

      <SelectOption
        filter={filter.year}
        name="year"
        onFilterChange={onFilterChange}
        options={years}
      />
    </>
  );
};

Filter.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Filter;
