// instance
import instance from './instance';

// GET MOVIES
import { GET_TV_SHOWS } from './constants';

async function fetchTvShows() {
    try {
      const response = await instance.get(GET_TV_SHOWS);
      const tvShows = response.data.results;
      return tvShows;
    } catch (error) {
      return error;
    };
};

export default fetchTvShows;