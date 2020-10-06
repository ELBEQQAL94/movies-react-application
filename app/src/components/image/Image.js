import React from "react";

// Prop Types
import PropTypes from "prop-types";

// Component
import Spinner from "../elements/Spinner";

// Style
import "./Image.css";

const Image = ({ image, loading }) => {
  if (image.length !== 0) {
    return (
      <div className="image__container">
        <img src={image} alt="poster" title="poster" />
      </div>
    );
  } else {
    return <Spinner loading={loading} />;
  }
};

Image.propTypes = {
  image: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Image;
