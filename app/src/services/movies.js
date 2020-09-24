// instance
import instance from './instance';

// GET MOVIES
import { GET_MOVIES } from './constants';

async function fetchMovies(setMovies, setLoading, setError) {
    try {
      const response = await instance.get(GET_MOVIES);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    };
};

export default fetchMovies;