import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.user.id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>
        {userData.user.firstname} {userData.user.lastname}
      </h1>
      <div className="update-container">
        <div className="left-part">
          <img src={userData.user.pictureUrl} alt="Utilisateur" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userData.user.bio}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue="Bio"
                  onChange={(event) => setBio(event.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider</button>
              </>
            )}
          </div>
          <h4>Membre depuis: {dateParser(userData.user.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
