import React, {useState} from "react";

import { useLocation, useHistory } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

// add query
import { setQueryToUrl } from "../../utils";

const RadioButton = ({ value, title }) => {

  let history = useHistory();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  // Sort by
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "");

  const onSortChange = (e) => {
    const { name, value } = e.target;
    // change sort by value
    setSortBy(value);
    // add query
    setQueryToUrl(name, value, location, history);
  };

  return (
    <div className="form-group form-check">
      <input
        id={value}
        type="radio"
        value={value}
        className="form-check-input"
        name="sort_by"
        checked={sortBy === value}
        onChange={onSortChange}
      />
      <label className="form-check-label" htmlFor={value}>
        {title}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RadioButton;
