import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((error) => console.log(error));
  };
};

export const updatePost = (id, post) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
      data: { post },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { post, id } });
      })
      .catch((error) => console.log(error));
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((error) => console.log(error));
  };
};

export const addComment = (postId, userId, comment) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comment/`,
      data: { postId, userId, comment },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((error) => console.log(error));
  };
};

export const editComment = (id, comment) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
      data: { comment },
    })
      .then((res) => {
        dispatch({
          type: EDIT_COMMENT,
          payload: { comment, id },
        });
      })
      .catch((error) => console.log(error));
  };
};
