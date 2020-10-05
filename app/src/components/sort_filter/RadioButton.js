import React from "react";

// Prop Types
import PropTypes from "prop-types";

const RadioButton = ({ value, title, onSortChange, sortBy }) => (
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

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default RadioButton;
