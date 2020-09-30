// instance
import instance from './instance';

// GET MOVIES
import { GET_MOVIES } from './constants';

async function movies(params) {
    try {
      const response = await instance.get(`${GET_MOVIES}&${params}`);
      return response.data;
    } catch (error) {
      return error;
    };
};

export default movies;