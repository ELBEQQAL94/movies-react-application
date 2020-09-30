// instance
import instance from "./instance";

// GET MOVIES
import { GET_TV_SHOWS } from "./constants";

async function tvShowsService(params) {
  try {
    const response = await instance.get(`${GET_TV_SHOWS}&${params}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export default tvShowsService;
