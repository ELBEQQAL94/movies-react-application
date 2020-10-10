import React, { useState } from "react";

// random id
import { v4 as uuidv4 } from "uuid";

// react hooks form for validation
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firestore from firebase
import { db } from "../../services/firebase";

// utils
import { setYears } from "../../utils";

// Components
import UploadImage from "../../components/upload_image/UploadImage";
import Image from "../../components/image/Image";
import ErrorMessage from "../../components/error_message/ErrorMessage";

const CreateElementForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [image, setImage] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // generate years from 1994
  const years = setYears();

  const onSubmit = (data) => {
    data.image = imageAsUrl;
    db.collection("elements").doc(uuidv4()).set(data);
    toast.success("Element created!");
  };

  console.log(imageAsUrl)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="name"
          name="name"
          ref={register({ required: true })}
        />
        <ErrorMessage
          error={errors.name ? true : false}
          message="Name is required"
        />
      </div>

      <Image image={image} loading={loading} />

      <UploadImage 
        setImage={setImage} 
        setLoading={setLoading} 
        setImageAsUrl={setImageAsUrl}
      />

      <div className="form-group">
        <select
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

      <div className="form-group form-check">
        <input
          id="movie"
          type="radio"
          value="movie"
          className="form-check-input"
          name="type"
          ref={register({ required: true })}
        />
        <label className="form-check-label" htmlFor="movie">
          Movie
        </label>
      </div>
      <ErrorMessage
        error={errors.type ? true : false}
        message="Type is required"
      />
      <div className="form-group form-check">
        <input
          id="tv-shows"
          type="radio"
          value="tv-shows"
          className="form-check-input"
          name="type"
          ref={register({ required: true })}
        />
        <label className="form-check-label" htmlFor="tv-shows">
          Tv Shows
        </label>
      </div>
      <ErrorMessage
        error={errors.type ? true : false}
        message="Type is required"
      />
      <ToastContainer />
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
