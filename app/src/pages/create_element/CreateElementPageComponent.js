import React, {useState} from "react";

// react hooks form for validation
import { useForm } from "react-hook-form";

// Change title of the document
import { Helmet } from "react-helmet";

import { setYears } from "../../utils";


const CreateElementPageComponent = () => {
    const TITLE = "Create Element";
    const { register, handleSubmit, watch, errors } = useForm();
    const [inputs, setInput] = useState({
        name: '',
        year: '',
        type: 'movie',
    });

    // generate years from 1994
    const years = setYears();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({...inputs, [name]: value});
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        console.log(data)
    };

    const {name, year, type} = inputs;

    return (
        <main className="main">
            <Helmet>
            <title>{TITLE}</title>
            </Helmet>
            <div className="container">
                <h2>Create Element</h2>
                <div className="form__container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                aria-describedby="nameHelp"
                                name="name"
                                value={name} 
                                ref={register({ required: true })}
                                onChange={handleChange} 
                            />
                            {errors.name && 
                            <small 
                                id="nameHelp" 
                                className="form-text text-muted"
                            > Name is required</small>}
                        </div>

                        {/* Image */}
                        <div className="form-group">
                            <label for="image">Upload Image</label>
                            <input 
                                type="file" 
                                className="form-control-file" 
                                id="image"
                                name="image"
                                ref={register({ required: true })}
                            />
                            {errors.image && 
                            <small 
                                id="nameHelp" 
                                className="form-text text-muted"
                            >Image is required</small>}
                        </div>
                        {/* Year (select options) */}
                        <div className="form-group">
                            <select
                                value={year}
                                onChange={handleChange}
                                name='year'
                                className="form-control"
                                ref={register({ required: true })}
                            >
                                <option value="">Choose year...</option>
                                {years?.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                                ))}
                            </select>
                            {errors.year && 
                            <small 
                                id="nameHelp" 
                                className="form-text text-muted"
                            >Year is required</small>}
                        </div>
                        {/* Type (radio button) */}
                        <div className="form-group form-check">
                            <input
                                id="movie"
                                type="radio"
                                value="movie"
                                className="form-check-input"
                                name="type"
                                checked={type === "movie"}
                                onChange={handleChange}
                                ref={register()}
                            />
                            <label className="form-check-label" htmlFor="movie">
                                movie
                            </label>
                        </div>
                        <div className="form-group form-check">
                            <input
                                id="tv-shows"
                                type="radio"
                                value="tv-shows"
                                className="form-check-input"
                                name="type"
                                checked={type === "tv-shows"}
                                onChange={handleChange}
                                ref={register()}
                            />
                            <label className="form-check-label" htmlFor="tv-shows">
                                Tv Shows
                            </label>
                        </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CreateElementPageComponent;
