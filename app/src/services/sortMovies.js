// instance
import instance from './instance';

// GET MOVIES
import { SORT_MOVIES } from './constants';

async function sortMovies(sortBy) {
    try {
      const response = await instance.get(`${SORT_MOVIES}${sortBy}`);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return error;
    };
};

export default sortMovies;