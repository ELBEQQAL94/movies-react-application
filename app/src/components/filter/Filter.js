import React, {useState, useEffect} from 'react';

import { useHistory } from 'react-router-dom';

// Prop Types
import PropTypes from 'prop-types';

// SORT MOVIES FROM SERVER
import sortMovies from '../../services/sortMovies';

// utils
import { setYears, convertParamsToValidUrl } from '../../utils';

// Style
import './Filter.css';

const Filter = ({
    setFilterMovies, 
    setLoading, 
    setError
}) => {

    let history = useHistory();

    // get params from local storage 
    const getParamsFromLocalStorage = JSON.parse(localStorage.getItem('params')) || {};
    
    // get filter from local storage
    const getSortByFromLocalStorage = localStorage.getItem('sort_by') || '';

    // Sort by
    const [sortBy, setSortBy] = useState(getSortByFromLocalStorage);

    // filter by language
    const [selectedLang, setSelectedLang] = useState('');

    // filter by year
    const [selectedYear, setSelectedYear] = useState('');

    // filter params (sorty_by, year, lang)
    const [params, setParams] = useState(getParamsFromLocalStorage);

    // generate years from 1994
    const years = setYears();

    useEffect(() => {
        async function fetchData() {

            // store params in local storage
            localStorage.setItem("params", JSON.stringify(params));

            // display query in current path
            history.replace(`/movies?${convertParamsToValidUrl(params)}`);

            const movies = await sortMovies(params);
            if(!movies) {
                setLoading(false);
                setError(true);
            }
            setFilterMovies(movies);
            setLoading(false);
        };
        fetchData();
    }, [params, setFilterMovies, history, setLoading, setError]);

    const onValueChange = (e) => {
        let sort_by = e.target.value;

        // store ReleaseDate value in local storage
        setSortBy(sort_by);

        // set sort_by in query string
        setParams(previousParams =>({
            ...previousParams,
            sort_by,
        }));

        // store selected option value in local storage
        localStorage.setItem("sort_by", e.target.value);

        // store query in local storage
        localStorage.setItem("query", `/movies?sort_by=${e.target.value}`);        
    };

    // handle language if changed
    const onLangChange = (e) => {
        let language = e.target.value;
        setSelectedLang(language);
        setParams(previousParams =>({
            ...previousParams,
            language,
        }));
    };

    // handle language if changed
    const onYearChange = (e) => {
        let year = e.target.value;
        setSelectedYear(year);
        setParams(previousParams =>({
            ...previousParams,
            year,
        }));
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
                        name="sort"
                        checked={sortBy === "release_date.desc"}
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
                        name="sort"
                        checked={sortBy === "revenue.desc"}
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
                        name="sort"
                        checked={sortBy === "popularity.desc"}
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
                        name="sort"
                        checked={sortBy === "vote_average.desc"}
                        onChange={onValueChange}
                    />
                    <label 
                        className="form-check-label" htmlFor="vote_average"
                    >Vote Average</label>
                </div>

                <div 
                    className="form-group" 
                    value={selectedLang}
                    onChange={onLangChange}>
                    <select className="form-control">
                        <option value=''>Choose language...</option>
                        <option value='en'>en</option>
                        <option value='es'>es</option>
                        <option value='fr'>fr</option>
                        <option value='ar'>ar</option>
                    </select>
                </div>

                <div 
                    className="form-group" 
                    value={selectedYear}
                    onChange={onYearChange}>
                    <select className="form-control">
                        <option value=''>Choose year...</option>
                        {
                            years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))
                        }
                    </select>
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