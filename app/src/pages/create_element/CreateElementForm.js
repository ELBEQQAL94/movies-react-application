import React, {useState} from "react";

// random id
import { v4 as uuidv4 } from 'uuid';

// react hooks form for validation
import { useForm } from "react-hook-form";

// firestore from firebase
import { db } from '../../services/firebase';

// utils
import { setYears } from "../../utils";

// Component
import UploadImage from "../../components/upload_image/UploadImage";
import Image from "../../components/image/Image";

const CreateElementForm = () => {
    
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
      data.id = uuidv4();
      data.image = image;
      console.log("New Element: ", data);
      // add data to firestore...
      db
        .collection('elements')
        .doc(data.name)
        .set(data);
    
        // with replace you can't back to payment page after payment done!
        // history.replace('/orders')
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
        {errors.name && (
          <small id="nameHelp" className="form-text text-muted">
            {" "}
            Name is required
          </small>
        )}
      </div>

      <Image image={image} loading={loading} />

      <UploadImage setImage={setImage} setLoading={setLoading} />

      {/* Year (select options) */}
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
        {errors.year && (
          <small id="nameHelp" className="form-text text-muted">
            Year is required
          </small>
        )}
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
        Add element
      </button>
    </form>
  );
};

export default CreateElementForm;
