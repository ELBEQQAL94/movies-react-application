import React, {useState, useEffect} from "react";

// Prop Types
import PropTypes from "prop-types";

// firebase storage
import { storage } from "../../services/firebase";

const UploadImage = ({setImage, setLoading}) => {

    const [imageAsFile, setImageAsFile] = useState("");

    useEffect(() => {
        if(imageAsFile['name']){
            uploadImg();
        };
    }, [imageAsFile]);

    const uploadImg = () => {
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
                        setImage(fireBaseUrl);
                        setLoading(false);
                });
            }
        );
    };

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setLoading(true);
        setImageAsFile((imageFile) => image);
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
        </>
    );
};

UploadImage.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
};

export default UploadImage;
