// instance
import instance from './instance';

// GET MOVIES
import { GET_MOVIES } from './constants';

async function filterMoviesService(params) {
    try {
      const response = await instance.get(`${GET_MOVIES}&${params}`);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return error;
    };
};

export default filterMoviesService;