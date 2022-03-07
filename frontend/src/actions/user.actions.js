import axios from "axios";

//user
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then(() => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.pictureUrl });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateBio = (id, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      data: { bio },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_BIO,
          payload: { bio, id },
        });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteAccount = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_ACCOUNT, payload: { id } });
      })
      .catch((error) => console.log(error));
  };
};
