import React, { useState } from "react";

// react hooks form for validation
import { useForm } from "react-hook-form";

// Change title of the document
import { Helmet } from "react-helmet";

// firebase storage
import { storage } from "../../services/firebase";

// utils
import { setYears } from "../../utils";

const CreateElementPageComponent = () => {
  const TITLE = "Create Element";
  const { register, handleSubmit, watch, errors } = useForm();
  const [inputs, setInput] = useState({
    name: "",
    year: "",
    type: "movie",
  });
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  // generate years from 1994
  const years = setYears();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputs, [name]: value });
  };

  const onSubmit = (data) => {
    // const formData = new FormData();
    // formData.append('image', data.image[0]);
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  console.log("image as url: ", imageAsUrl);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const { name, year, type } = inputs;

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

            {/* Image */}
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={handleImageAsFile}
                ref={register({ required: true })}
              />
              {errors.image && (
                <small id="nameHelp" className="form-text text-muted">
                  Image is required
                </small>
              )}
            </div>
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
