import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
} from "reducer";

export const followReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_LOADING:
      return { ...state, status: "loading", username: action.payload };

    case ACTION_TYPE_SUCCESS:
      return {
        ...state,
        username: "",
        status: "success",
        data: action.payload,
      };

    case ACTION_TYPE_ERROR:
      return { ...state, status: "error", error: action.payload, username: "" };

    default:
      return state;
  }
};
