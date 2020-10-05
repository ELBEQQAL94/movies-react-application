import React, {useState} from "react";

import { useLocation, useHistory } from "react-router-dom";

// Prop Types
import PropTypes from "prop-types";

// add query
import { setQueryToUrl } from "../../utils";

// Components
import RadioButton from "./RadioButton";

const SortFilter = ({setLoading}) => {

  let history = useHistory();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  // Sort by
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "popularity.desc"
  );

  const onSortChange = (e) => {
    const { name, value } = e.target;
    // change sort by value
    setSortBy(value);
    // show spinner
    setLoading(true)
    // add query
    setQueryToUrl(name, value, location, history);
  };

  return (
    <>
      {/* release_date.desc */}
      <RadioButton 
        onSortChange={onSortChange} 
        value="release_date.desc" 
        title="Release Date"
        sortBy={sortBy}  
      />

      {/* revenue.desc */}
      <RadioButton 
        onSortChange={onSortChange} 
        value="revenue.desc" 
        title="Revenue"
        sortBy={sortBy} 
      />

      {/* popularity.desc */}
      <RadioButton 
        onSortChange={onSortChange} 
        value="popularity.desc" 
        title="Popularity"
        sortBy={sortBy} 
      />

      {/* vote_average.desc */}
      <RadioButton 
        onSortChange={onSortChange} 
        value="vote_average.desc" 
        title="Vote Average"
        sortBy={sortBy} 
      />
    </>
  );
};

SortFilter.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default SortFilter;
