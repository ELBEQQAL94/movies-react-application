import React, { useState, useEffect, useCallback } from "react";

// Prop Types
import PropTypes from "prop-types";

// firebase storage
import { storage } from "../../services/firebase";

// Components
import ErrorMessage from "../../components/error_message/ErrorMessage";
import ProgressBar from "../progress_bar/ProgressBar";

const UploadImage = ({ setImage, setLoading, setImageAsUrl }) => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const uploadImg = useCallback(() => {
    const upload = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    upload.on(
      "state_changed",
      (snapshot) => {
        setShow(true);
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
            setImageAsUrl(fireBaseUrl);
            setLoading(false);
            setShow(false);
          });
      }
    );
  }, [imageAsFile, setProgress, setImageAsUrl, setLoading]);

  useEffect(() => {
    if(imageAsFile["name"]) uploadImg();
  }, [uploadImg, imageAsFile]);


  const checkImageDimensions = (e) => {
    const URL = window.URL || window.webkitURL
    const file = e.target;
    if (file.files[0] != undefined) {
      const MAX_WIDTH = 3000;
      const MAX_HEIGHT = 3000;
      const image = new Image();
      image.src = URL.createObjectURL(file.files[0]);
      setImage(image.src);
      image.onload = function(e) {
        if(this.width > MAX_WIDTH && this.height > MAX_HEIGHT) {
          setError(true);
          setMessage(`Image width must be ${MAX_WIDTH} and height must be ${MAX_HEIGHT}`);
          setImageAsUrl("");
          setImageAsUrl("");
          return false;
        }
        return true;
      };
    } else {
      setError(false);
      setMessage("");
      return true;
    }
  }

  // const checkMimeType = (e) => {
  //   const types = ["image/png", "image/jpeg", "image/gif"];
  //   let typeFile = e.target.files[0].type;
  //   if (types.every((type) => typeFile !== type)) {
  //     setError(true);
  //     setMessage("Is not a supported format");
  //     e.target.value = null;
  //     setImage("");
  //     return false;
  //   }
  //   setError(false);
  //   setMessage("");
  //   return true;
  // };

  const checkFileSize = (e) => {
    let size = 40000;
    let fileSize = e.target.files[0].size;
    if (fileSize > size) {
      setError(true);
      setMessage("Is too large, please pick a smaller file");
      e.target.value = null;
      setImage("");
      setImageAsUrl("");
      return false;
    }
    setError(false);
    setMessage("");
    return true;
  };

  const handleImageAsFile = (e) => {
    const file = e.target.files[0];
    console.log(checkImageDimensions(e))
    if(file !== undefined) {
      if (checkFileSize(e)) {
        setLoading(true);
        setImageAsFile((imageFile) => file);
      }
    } else {
      setImage("");
      setProgress(0);
      setShow(false);
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
          accept="image/*"
          required
        />
      </div>
      <ErrorMessage error={error} message={message} />
      <ProgressBar show={show} progress={progress}/>
    </>
  );
};

UploadImage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  setImageAsUrl: PropTypes.func.isRequired,
};

export default UploadImage;
