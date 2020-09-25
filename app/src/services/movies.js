// instance
import instance from './instance';

// GET MOVIES
import { GET_MOVIES } from './constants';

async function fetchMovies() {
    try {
      const response = await instance.get(GET_MOVIES);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return error;
    };
};

export default fetchMovies;