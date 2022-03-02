import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Profile = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>Update</h1>
      ) : (
        <div className="log-container">
          <Log />
          <img src="#" alt="Login" />
        </div>
      )}
    </div>
  );
};

export default Profile;
