import {
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
  DELETE_ACCOUNT,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_PICTURE:
      return {
        ...state,
        pictureUrl: action.payload,
      };

    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    case DELETE_ACCOUNT:
      return state.filter((user) => user.id !== action.payload.id);

    default:
      return state;
  }
}
