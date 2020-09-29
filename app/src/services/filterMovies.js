// instance
import instance from './instance';

// GET MOVIES
import { GET_MOVIES } from './constants';

// convert params to valid query url
import {convertParamsToValidUrl} from '../utils';

async function filterMoviesService(params) {
    // const queries = convertParamsToValidUrl(params);
    try {
      const response = await instance.get(`${GET_MOVIES}&${params}`);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      return error;
    };
};

export default filterMoviesService;