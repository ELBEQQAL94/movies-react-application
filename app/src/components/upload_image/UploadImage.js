import React, { useState, useEffect, useCallback } from "react";
import imageCompression from 'browser-image-compression';

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
    const upload = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
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
    if (imageAsFile["name"]) uploadImg();
  }, [uploadImg, imageAsFile]);

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

  const handleImageAsFile = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true
    }
    if (file !== undefined) {
      if (checkFileSize(e)) {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        setImage(image.src);
        setLoading(true);
        try {
          const compressedFile = await imageCompression(file, options);
          setImageAsFile((imageFile) => compressedFile);
        } catch (error) {
          console.log(error);
        }
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
      <ProgressBar show={show} progress={progress} />
    </>
  );
};

UploadImage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  setImageAsUrl: PropTypes.func.isRequired,
};

export default UploadImage;
