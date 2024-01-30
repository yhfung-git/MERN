import { useRef, useState } from "react";

import Button from "../Button/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length === 1) {
      pickedFile = selectedFiles[0];
      setPreviewUrl(URL.createObjectURL(pickedFile));
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview Image" />}
          {!previewUrl && <p>No image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
