import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de 'first last name user'</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src="#" alt="Utilisateur" />
          UPLOAD pic
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
