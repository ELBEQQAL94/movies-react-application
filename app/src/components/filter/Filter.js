import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

// utils
import { setYears, addQuery } from "../../utils";

// Components
import Collapse from "../collapse/Collapse";
import RadioButton from "./RadioButton";

// Style
import "./Filter.css";

const Filter = ({ setCurrentPage }) => {
  let history = useHistory();
  let location = useLocation();

  // filter object
  const [filter, setFilter] = useState({
    language: "",
    year: "",
  });

  // generate years from 1994
  const years = setYears();

  // handle filter
  const onFilterChange = (e) => {
    const { name, value } = e.target;
    // set filter
    setFilter({ ...filter, [name]: value });
    // reset page only if year change
    if (name === "year") setCurrentPage(1);
    // add query
    addQuery(name, value, location, history);
  };

  return (
    <Collapse>
      <div className="filter">
        <form>
          {/* release_date.desc */}
          <RadioButton value="release_date.desc" title="Release Date"/>

          {/* revenue.desc */}
          <RadioButton value="revenue.desc" title="Revenue"/>

          {/* popularity.desc */}
          <RadioButton value="popularity.desc" title="Popularity"/>

          {/* vote_average.desc */}
          <RadioButton value="vote_average.desc" title="Vote Average"/>

          <div className="form-group">
            <select
              value={filter.language}
              onChange={onFilterChange}
              name="language"
              className="form-control"
            >
              <option value="">Choose language...</option>
              <option value="en">en</option>
              <option value="es">es</option>
              <option value="fr">fr</option>
              <option value="ar">ar</option>
            </select>
          </div>

          <div className="form-group">
            <select
              value={filter.year}
              onChange={onFilterChange}
              name="year"
              className="form-control"
            >
              <option value="">Choose year...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </Collapse>
  );
};

Filter.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Filter;
