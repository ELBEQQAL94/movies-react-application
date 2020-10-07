import React, { useState } from "react";

import { useHistory } from "react-router-dom";

// random id
import { v4 as uuidv4 } from "uuid";

// react hooks form for validation
import { useForm } from "react-hook-form";

// firestore from firebase
import { db } from "../../services/firebase";

// utils
import { setYears } from "../../utils";

// Component
import UploadImage from "../../components/upload_image/UploadImage";
import Image from "../../components/image/Image";
import ErrorMessage from "../../components/error_message/ErrorMessage";

const CreateElementForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInput] = useState({
    name: "",
    year: "",
    type: "movie",
    image: "",
  });

  // generate years from 1994
  const years = setYears();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputs, [name]: value });
  };

  const onSubmit = (data) => {
    data.image = image;
    const { type } = data;
    const path = type === "movie" ? "/movies" : "/tv-shows";
    // add data to firestore on firebase
    db.collection("elements").doc(uuidv4()).set(data);

    // redirect user based on element type
    //history.push(path);
  };

  const { name, year, type } = inputs;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
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
        <ErrorMessage 
            error={errors.name ? true : false} 
            message="Name is required" 
        />
      </div>

      <Image image={image} loading={loading} />

      <UploadImage setImage={setImage} setLoading={setLoading} />

      {/* Year */}
      <div className="form-group">
        <select
          value={year}
          onChange={handleChange}
          name="year"
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
        <ErrorMessage 
            error={errors.year ? true : false} 
            message="Year is required" 
        />
      </div>

      {/* Type */}
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
          Movie
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
      <button
        disabled={loading}
        className="btn btn-primary btn-block"
        type="submit"
      >
        ADD ELEMENT
      </button>
    </form>
  );
};

export default CreateElementForm;
