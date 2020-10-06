// Main Layout
import MainLayout from '../components/main_layout/MainLayout';

// Routes 
import {
    HOME_ROUTE,
    MOVIES_ROUTE,
    TV_SHOWS_ROUTE,
    CREATE_ELEMENT_ROUTE,
    NOT_FOUND_ROUTE,
} from './constants';

// Pages
import HomePageComponent from '../pages/home/HomePageComponent';
import TvShowsPageComponent from '../pages/tv_shows/TvShowsPageComponent';
import MoviesPageComponent from '../pages/movies/MoviesPageComponent';
import CreateElementPageComponent from '../pages/create_element/CreateElementPageComponent';
import NotFoundPageComponent from '../pages/page_not_found/NotFoundPageComponent';


export const APP_ROUTES = [
    {
        id: 1,
        path: HOME_ROUTE,
        layout: MainLayout,
        exact: true,
        component: HomePageComponent
    },
    {
        id: 2,
        path: MOVIES_ROUTE,
        layout: MainLayout,
        exact: true,
        component: MoviesPageComponent
    },
    {
        id: 3,
        path: TV_SHOWS_ROUTE,
        layout: MainLayout,
        exact: true,
        component: TvShowsPageComponent
    },
    {
        id: 4,
        path: CREATE_ELEMENT_ROUTE,
        layout: MainLayout,
        exact: true,
        component: CreateElementPageComponent
    },
    {
        id: 5,
        path: NOT_FOUND_ROUTE,
        layout: MainLayout,
        exact: true,
        component: NotFoundPageComponent
    },
];
