import React, {useState, useEffect} from 'react';

import { useHistory, useLocation } from 'react-router-dom';

// Prop Types
import PropTypes from 'prop-types';

// SORT MOVIES FROM SERVER
import filterMoviesService from '../../services/filterMovies';

// utils
import { setYears, addQuery } from '../../utils';

// Components
import Collapse from '../collapse/Collapse';

// Style
import './Filter.css';

const Filter = ({
    setFilterMovies, 
    setLoading, 
    setError
}) => {

    let history = useHistory();
    let location = useLocation();
    let searchParams = new URLSearchParams(location.search).toString(); 

    // Sort by
    const [sortBy, setSortBy] = useState('');

    // filter object
    const [filter, setFilter] = useState({
        language: '',
        year: '',
    });

    // generate years from 1994
    const years = setYears();

    useEffect(() => {
        async function fetchData() {
            const movies = await filterMoviesService(searchParams);
            if(!movies) {
                setLoading(false);
                setError(true);
            }
            setFilterMovies(movies);
            setLoading(false);
        };
        fetchData();
    }, [searchParams, setFilterMovies, setLoading, setError]);

    // handle sort param
    const onSortChange = (e) => {
        let sort_by = e.target.value;
        // change sort by value
        setSortBy(sort_by);
        // add query
        addQuery('sort_by', sort_by, location, history);
    };

    // handle filter
    const onFilterChange = (e) => {
        const { name, value } = e.target;
        // set filter
        setFilter({ ...filter, [name]: value });
        // add query
        addQuery(name, value, location, history);
    };

    return (
        <Collapse>
            <div className='filter'>
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
                            onChange={onSortChange}
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
                            onChange={onSortChange}
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
                            onChange={onSortChange}
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
                            onChange={onSortChange}
                        />
                        <label 
                            className="form-check-label" htmlFor="vote_average"
                        >Vote Average</label>
                    </div>

                    <div className="form-group" >
                        <select
                            value={filter.language}
                            onChange={onFilterChange}
                            name="language" 
                            className="form-control">
                                <option value=''>Choose language...</option>
                                <option value='en'>en</option>
                                <option value='es'>es</option>
                                <option value='fr'>fr</option>
                                <option value='ar'>ar</option>
                        </select>
                    </div>

                    <div className="form-group" >
                        <select 
                            value={filter.year}
                            onChange={onFilterChange}
                            name="year"
                            className="form-control"
                        >
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
        </Collapse>
    );
};

Filter.propTypes = {
    setFilterMovies: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
};

export default Filter;