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
      <h1> Profil de 'first last name user'</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src="#" alt="Utilisateur" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>Bio</p>
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
          <h4>Membre depuis: {dateParser("mardi 5 nov. 2022 à 10:10:10")}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
