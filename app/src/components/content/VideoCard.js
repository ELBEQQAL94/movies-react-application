import React, { useState } from 'react';

// prop types
import PropTypes from 'prop-types';

// Styles
import './VideoCard.css';

const VideoCard = ({ movie, baseImgUrl }) => {
  const [loadImag, setLoadImag] = useState(false);
  const { backdrop_path, poster_path } = movie;
  const title = movie?.title || movie?.name || movie?.original_name;
  const IMG_URL = backdrop_path || poster_path;
  const DEFAULT_URL = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="content">
        <h2>{title}</h2>
        <img
          style={loadImag ? {} : { display: 'none' }}
          src={IMG_URL ? `${baseImgUrl}${IMG_URL}` : `${DEFAULT_URL}`}
          alt={title}
          title={title}
          onLoad={() => setLoadImag(true)}
        />
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  movie: PropTypes.object.isRequired,
  baseImgUrl: PropTypes.string.isRequired,
};

export default VideoCard;
