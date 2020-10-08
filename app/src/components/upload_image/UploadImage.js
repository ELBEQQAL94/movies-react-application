import React, { useState, useEffect, useCallback } from "react";

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

  const uploadImg = useCallback(() => {
    const upload = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    upload.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        console.log(err);
      },
      () => {
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
  }, [imageAsFile, setProgress, setImage, setLoading]);

  useEffect(() => {
    if (imageAsFile !== "") {
      if(imageAsFile["name"] !== undefined) uploadImg();
    }
  }, [uploadImg, imageAsFile]);


  const checkMimeType = (e) => {
    const types = ["image/png", "image/jpeg", "image/gif"];
    if(e.target.files[0]) {
      let typeFile = e.target.files[0].type;
      if (types.every((type) => typeFile !== type)) {
        setError(true);
        setMessage("Is not a supported format");
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
        setError(true);
        setMessage("Is too large, please pick a smaller file");
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
    // check if there is a file or not
    if (checkMimeType(e) && checkFileSize(e)) {
      setLoading(true);
      setImageAsFile((imageFile) => file);
    }
  };

  return (
    <>
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
