import React from "react";

import { useHistory, useLocation } from "react-router-dom";

// Material UI Pagination
import Pagination from "@material-ui/lab/Pagination";

// Prop Types
import PropTypes from "prop-types";

// add query
import { addQuery } from "../../utils";

// Style
import "./Pagination.css";

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  let history = useHistory();
  let location = useLocation();

  const handlePage = (event, value) => {
    setCurrentPage(value);
    addQuery("page", value, location, history);
  };

  return (
    <div className="pagination__container">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePage}
        size="large"
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </div>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default PaginationComponent;
