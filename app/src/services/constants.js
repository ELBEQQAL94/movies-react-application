// API KEY FOR FETCH DATA FROM SERVER
const API_KEY = '27a06a6fe752225bcecc30870f193be2';

// TMDB API's BASE URL
const BASE_URL = 'https://api.themoviedb.org/3';

// BASE IMAGE URL FROM TMDB API's
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

// GET MOVIES
const GET_TV_SHOWS = `/discover/tv?api_key=${API_KEY}`;

// GET TV SHOWS
const GET_MOVIES = `/discover/movie?api_key=${API_KEY}`;

// SORT_MOVIES
const SORT_MOVIES = `/discover/movie?api_key=${API_KEY}&sort_by=`;

export {
  API_KEY,
  BASE_URL,
  BASE_IMG_URL,
  GET_MOVIES,
  GET_TV_SHOWS,
  SORT_MOVIES,
};
