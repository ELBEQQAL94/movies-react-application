import React, {useState, useEffect} from 'react';

import { useHistory } from "react-router-dom";

// Prop Types
import PropTypes from 'prop-types';

// SORT MOVIES FROM SERVER
import sortMovies from '../../services/sortMovies';

// Style
import './Filter.css';

const Filter = ({
    setFilterMovies, 
    setLoading, 
    setError
}) => {

    let history = useHistory();

    // get query from local storage
    const getQueryFromLocalStorage = localStorage.getItem('query') || '/movies';

    // get filter from local storage
    const getFilterFromLocalStorage = localStorage.getItem('filter') || '';

    // Hooks
    const [filter, setFilter] = useState(getFilterFromLocalStorage);

    useEffect(() => {
        if(filter.length > 0) {
            async function fetchData() {
                const movies = await sortMovies(filter);
                if(!movies) {
                    setLoading(false);
                    setError(true);
                }
                setFilterMovies(movies);
                setLoading(false);
            };
            fetchData();
            history.replace(getQueryFromLocalStorage);
        } else {
            setFilterMovies([]);
        }
    }, [filter, setFilterMovies, setLoading, setError]);

    const onValueChange = (e) => {
        // store ReleaseDate value in local storage
        setFilter(e.target.value);

        // store selected option value in local storage
        localStorage.setItem("filter", e.target.value);

        // store query in local storage
        localStorage.setItem("query", `/movies?sort_by=${e.target.value}`);
        
        // add query to current path
        history.replace(`/movies?sort_by=${e.target.value}`);
    };

    return (
        <div className='filter'>
            <h2>Filter</h2>
            <form>
                {/* release_date.desc */}
                <div className="form-group form-check">
                    <input 
                        id="release_date"
                        type="radio" 
                        value="release_date.desc"
                        className="form-check-input"
                        name="filter"
                        checked={filter === "release_date.desc"}
                        onChange={onValueChange}
                    />
                    <label 
                        className="form-check-label" htmlFor="release_date"
                    >Release Date</label>
                </div>

                {/* revenue.desc */}
                <div className="form-group form-check">
                    <input 
                        id="revenue"
                        type="radio" 
                        className="form-check-input"
                        value="revenue.desc"
                        name="filter"
                        checked={filter === "revenue.desc"}
                        onChange={onValueChange}
                    />
                    <label 
                        className="form-check-label" htmlFor="revenue"
                    >Revenue</label>
                </div>

                {/* popularity.desc */}
                <div className="form-group form-check">
                    <input 
                        id="popularity"
                        type="radio" 
                        className="form-check-input"
                        value="popularity.desc"
                        name="filter"
                        checked={filter === "popularity.desc"}
                        onChange={onValueChange}
                    />
                    <label 
                        className="form-check-label" htmlFor="popularity"
                    >Popularity</label>
                </div>

                {/* vote_average.desc */}
                <div className="form-group form-check">
                    <input 
                        id="vote_average"
                        type="radio" 
                        className="form-check-input"
                        value="vote_average.desc"
                        name="filter"
                        checked={filter === "vote_average.desc"}
                        onChange={onValueChange}
                    />
                    <label 
                        className="form-check-label" htmlFor="vote_average"
                    >Vote Average</label>
                </div>
            </form>
        </div>
    );
};

Filter.propTypes = {
    setFilterMovies: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
};

export default Filter;