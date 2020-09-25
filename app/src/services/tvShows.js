// instance
import instance from './instance';

// GET MOVIES
import { GET_TV_SHOWS } from './constants';

async function fetchTvShows(setTvShows, setLoading, setError) {
    try {
      const response = await instance.get(GET_TV_SHOWS);
      setTvShows(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    };
};

export default fetchTvShows;