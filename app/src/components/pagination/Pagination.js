import React, {useEffect} from "react";

import { useHistory, useLocation } from "react-router-dom";

// Material UI Pagination
import Pagination from "@material-ui/lab/Pagination";

// Prop Types
import PropTypes from "prop-types";

// add query
import { setQueryToUrl } from "../../utils";

// Style
import "./Pagination.css";

const PaginationComponent = ({ 
  currentPage, 
  setCurrentPage, 
  totalPages,
  setLoading }) => {
  let history = useHistory();
  let location = useLocation();

  useEffect(() => 
    setQueryToUrl("page", currentPage, location, history)
  , [currentPage]);

  const handlePage = (event, value) => {
    setCurrentPage(value);
    setLoading(true);
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
  setLoading: PropTypes.func.isRequired,
};

export default PaginationComponent;
