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

    // get sort by value from local storage
    const sortByFromLocalStorage = localStorage.getItem('sort_by') || '';

    // get isReleasDate from local storage
    const isReleaseDateFromLocalStorage = localStorage.getItem('is_release_date') === 'true';

    // Hooks
    const [isReleaseDate, setReleaseDate] = useState(isReleaseDateFromLocalStorage);
    const [sortBy, setSortBy] = useState(sortByFromLocalStorage);

    useEffect(() => {
        if(sortBy.length > 0) {
            async function fetchData() {
                const movies = await sortMovies(sortBy);
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
    }, [sortBy, setFilterMovies, setLoading, setError]);

    const onChangeReleaseDate = (e) => {
        // store ReleaseDate value in local storage
        setReleaseDate(!isReleaseDate);
        // check if isReleaseDate is true
        if(!isReleaseDate) {
            setSortBy(e.target.name);

            // store sortBy value in local storage
            localStorage.setItem("sort_by", e.target.name);

            // store isRealeaseDate value in local storage
            localStorage.setItem("is_release_date", true);

            // add query to current path
            history.replace(`/movies?sort_by=${e.target.name}`);
            // store query in local storage
            localStorage.setItem("query", `/movies?sort_by=${e.target.name}`);

        } else {
            setSortBy('');

            // // remove query from current path
            history.replace("/movies");

            // clear storage
            localStorage.clear();
        };
    };

    return (
        <div className='filter'>
            <h2>Filter</h2>
            <form>
                <div className="form-group form-check">
                    <input 
                        id="release_date"
                        type="checkbox" 
                        className="form-check-input"
                        name="release_date.desc"
                        checked={isReleaseDate}
                        onChange={onChangeReleaseDate}
                    />
                    <label 
                        className="form-check-label" htmlFor="release_date"
                    >Release Date</label>
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