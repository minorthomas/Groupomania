import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CrudComment from "./CrudComment";

const CardComments = ({ post }) => {
  const [comment, setComment] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    if (comment) {
      dispatch(addComment(post.id, userData.user.id, comment))
        .then(() => dispatch(getPosts()))
        .then(() => setComment(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comments) => {
        return (
          <div
            className={
              comment.userId === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={comments.id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comments.userId) return user.pictureUrl;
                      else return null;
                    })
                    .join("")
                }
                alt="User pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    {!isEmpty(usersData[0]) &&
                      usersData.map((user) => {
                        if (user.id === comments.userId)
                          return user.firstname + " " + user.lastname;
                        else return null;
                      })}
                  </h3>
                  <span>{dateParser(comments.createdAt)}</span>
                </div>
                <p>{comments.comment}</p>
                <CrudComment comment={comments} />
              </div>
            </div>
          </div>
        );
      })}
      {userData.user.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="comment"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
