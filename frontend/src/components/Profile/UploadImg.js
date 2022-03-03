import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("firstname", userData.user.firstname);
    data.append("lastname", userData.user.lastname);
    data.append("id", userData.user.id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData.user.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Modifier photo</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
