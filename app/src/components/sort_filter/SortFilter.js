import React from "react";

// Components
import RadioButton from "./RadioButton";

const SortFilter = () => {
  return (
    <>
      {/* release_date.desc */}
      <RadioButton value="release_date.desc" title="Release Date" />

      {/* revenue.desc */}
      <RadioButton value="revenue.desc" title="Revenue" />

      {/* popularity.desc */}
      <RadioButton value="popularity.desc" title="Popularity" />

      {/* vote_average.desc */}
      <RadioButton value="vote_average.desc" title="Vote Average" />
    </>
  );
};

export default SortFilter;
