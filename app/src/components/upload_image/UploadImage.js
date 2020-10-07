import React, { useState, useEffect } from "react";

// Prop Types
import PropTypes from "prop-types";

// firebase storage
import { storage } from "../../services/firebase";

// Component
import ErrorMessage from "../../components/error_message/ErrorMessage";

const UploadImage = ({ setImage, setLoading }) => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (imageAsFile["name"]) {
      uploadImg();
    }
  }, [imageAsFile]);

  const uploadImg = () => {
    const upload = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    upload.on(
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
            setImage(fireBaseUrl);
            setLoading(false);
          });
      }
    );
  };

  const checkMimeType = (e) => {
    //getting file object
    let typeFile = e.target.files[0].type;
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // compare file type find doesn't matach
    if (types.every((type) => typeFile !== type)) {
      // create error message and assign to container
      setError(true);
      setMessage("is not a supported format");
      // discard selected file
      e.target.value = null;
      return false;
    }
    setError(false);
    setMessage("");
    return true;
  };

  const checkFileSize = (e) => {
    let fileSize = e.target.files[0].size;
    let size = 40000;
    if (fileSize > size) {
      // create error message and assign to container
      setError(true);
      setMessage("is too large, please pick a smaller file");
      // discard selected file
      e.target.value = null;
      return false;
    }
    setError(false);
    setMessage("");
    return true;
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    if (checkMimeType(e) && checkFileSize(e)) {
      setLoading(true);
      setImageAsFile((imageFile) => image);
    }
  };

  return (
    <>
      {/* Image */}
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          className="form-control-file"
          id="image"
          name="image"
          onChange={handleImageAsFile}
          required
        />
      </div>
      <ErrorMessage error={error} message={message} />
    </>
  );
};

UploadImage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
};

export default UploadImage;
