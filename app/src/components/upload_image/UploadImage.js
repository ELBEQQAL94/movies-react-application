import React, { useState, useEffect } from "react";

// Prop Types
import PropTypes from "prop-types";

// firebase storage
import { storage } from "../../services/firebase";

// Component
import ErrorMessage from "../../components/error_message/ErrorMessage";

const UploadImage = ({ setImage, setLoading }) => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (imageAsFile !== "" && imageAsFile["name"]) {
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
      (snapshot) => {
        //takes a snap shot of the process as it is happening
        //console.log(snapshot);
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // compare file type find doesn't matach
    if(e.target.files[0]) {
      //getting file object
      let typeFile = e.target.files[0].type;
      if (types.every((type) => typeFile !== type)) {
        // create error message and assign to container
        setError(true);
        setMessage("Is not a supported format");
        // discard selected file
        e.target.value = null;
        return false;
      }
    }
    setError(false);
    setMessage("");
    return true;
  };

  const checkFileSize = (e) => {
    let size = 40000;
    if(e.target.files[0]) {
      let fileSize = e.target.files[0].size;
      if (fileSize > size) {
        // create error message and assign to container
        setError(true);
        setMessage("Is too large, please pick a smaller file");
        // discard selected file
        e.target.value = null;
        return false;
      }
    }
    setError(false);
    setMessage("");
    return true;
  };

  const handleImageAsFile = (e) => {
    const file = e.target.files[0];
    if (checkMimeType(e) && checkFileSize(e)) {
      setLoading(true);
      setImageAsFile((imageFile) => file);
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
      <div className="progress mb-4" style={{height: "1px"}}>
        <div 
          className="progress-bar" 
          role="progressbar" 
          style={{width: `${progress}%`}} 
          aria-valuenow={progress} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
    </>
  );
};

UploadImage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
};

export default UploadImage;
