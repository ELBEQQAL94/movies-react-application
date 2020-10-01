import React from "react";

// Prop Types
import PropTypes from "prop-types";

const SelectOption = ({ filter, name, onFilterChange, options }) => {
  return (
    <div className="form-group">
      <select
        value={filter}
        onChange={onFilterChange}
        name={name}
        className="form-control"
      >
        <option value="">Choose {name}...</option>
        {options?.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectOption.propTypes = {
  filter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectOption;
