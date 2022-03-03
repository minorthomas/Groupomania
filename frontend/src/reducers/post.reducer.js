import {
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            post: action.payload.post,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.id);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.post.id) {
          return {
            ...state,
            comments: post.comments.map((comment) => {
              if (comment.id === action.payload.id) {
                return {
                  ...comment,
                  comment: action.payload.comment,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });
    default:
      return state;
  }
}
