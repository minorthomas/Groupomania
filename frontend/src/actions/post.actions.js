import axios from "axios";

//post
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";

//comment
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// error
export const GET_POST_ERRORS = "GET_POST_ERRORS";

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

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
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

export const updateComment = (id, comment) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
      data: { comment },
    })
      .then((res) => {
        dispatch({ type: UPDATE_COMMENT, payload: { comment, id } });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((error) => console.log(error));
  };
};
