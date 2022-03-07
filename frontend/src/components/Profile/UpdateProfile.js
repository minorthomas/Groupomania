import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  const handleDelete = () => {
    dispatch(deleteAccount(userData.id));
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>
        {userData.firstname} {userData.lastname}
      </h1>
      <div className="update-container">
        <div className="left-part">
          <img src={userData.pictureUrl} alt="user profile" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis: {dateParser(userData.createdAt)}</h4>
          <button
            className="delete-account-btn"
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer votre compte ?")) {
                handleDelete();
                window.location.href = "http://localhost:8080/profile";
              }
            }}
          >
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
