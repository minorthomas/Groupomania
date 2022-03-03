import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const CrudComment = ({ comment }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (event) => {
    event.preventDefault();

    if (text) {
      dispatch(updateComment(comment.id, comment.comment));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.userId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Annuler
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(event) => setText(event.target.value)}
            defaultValue={comment.comment}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Modifier" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CrudComment;
