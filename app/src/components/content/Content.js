import React from 'react';

// Service
import PropTypes from 'prop-types';
import { BASE_IMG_URL } from '../../services/constants';


// Components
import VideoCard from './VideoCard';

// styles
import './Content.css';

const Content = ({ content }) => {
  return (
    <section className="main__content">
      <div className="row">
        { content?.map((movie) => (
            <VideoCard
              key={movie.id}
              movie={movie}
              baseImgUrl={BASE_IMG_URL}
            />
          ))
        }
      </div>
    </section>
  );
};

Content.propTypes = {
  content: PropTypes.array.isRequired,
};

export default Content;
