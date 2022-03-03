import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = () => {};

  const handlePost = () => {};

  const cancelPost = () => {
    setPost("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profile">
            <div className="user-info">
              <img src={userData.user.pictureUrl} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(event) => setPost(event.target.value)}
              value={post}
            />
            {post || postPicture ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.user.pictureUrl} alt="user profile" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>
                        {userData.user.firstname} {userData.user.lastname}
                      </h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{post}</p>
                    <img src={postPicture} alt="post" />
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/picture.svg" alt="user post" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(event) => handlePicture(event)}
                />
              </div>
              <div className="btn-send">
                {post || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
