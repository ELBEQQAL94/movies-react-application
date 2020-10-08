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
  const [filters, setFilters] = useState({
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
    setFilters({ ...filters, [name]: value });
    if (name === "language"){
      // add query
      setQueryToUrl(name, value, location, history);
    }else {
      setCurrentPage(1)
      // add query
      setQueryToUrl(name, value, location, history);
      // show spinner
      setLoading(true);
    };
  };

  const {language, year} = filters;

  return (
    <>
      <SelectOption
        filter={language}
        name="language"
        onFilterChange={onFilterChange}
        options={options}
      />

      <SelectOption
        filter={year}
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
