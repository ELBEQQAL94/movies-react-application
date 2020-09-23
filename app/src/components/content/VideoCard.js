import React, { useState } from 'react';

// prop types
import PropTypes from 'prop-types';

// Styles
import "./VideoCard.css";

const VideoCard = ({movie, baseImgUrl}, ref) => {

    const [loadImag, setLoadImag] = useState(false);
    const {backdrop_path, poster_path} = movie;
    const title = movie?.title || movie?.name || movie?.original_name;

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="content">
                <h2>{title}</h2>
                <img 
                    style={loadImag ? {} : {display: 'none'}}
                    src={`${baseImgUrl}${backdrop_path || poster_path}`}
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