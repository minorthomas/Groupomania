import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={postMessage.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.userId) return user.pictureUrl;
                    else return null;
                  })
                  .join("")
              }
              alt="User pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId)
                          return user.firstname + " " + user.lastname;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.post}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.post}
                  onChange={(event) => setTextUpdate(event.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Modifier
                  </button>
                </div>
              </div>
            )}
            {post.pictureUrl && (
              <img src={post.pictureUrl} alt="card-pic" className="card-pic" />
            )}
            {userData.user.id === post.userId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>Commenter</span>
              </div>
              <img src="./img/icons/heart.svg" alt="like" />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
