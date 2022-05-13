import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "reducer";

export const sharedReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_LOADING:
      return { ...state, status: "loading" };

    case ACTION_TYPE_SUCCESS:
      return { ...state, status: "success", data: action.payload };

    case ACTION_TYPE_ERROR:
      return { ...state, status: "error", error: action.payload };

    default:
      return state;
  }
};
