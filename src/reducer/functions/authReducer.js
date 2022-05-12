import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  ACTION_TYPE_ENTER_FORM_DETAILS,
} from "reducer";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_LOADING:
      return { ...state, status: "loading" };

    case ACTION_TYPE_SUCCESS:
      return { ...state, status: "success" };

    case ACTION_TYPE_ERROR:
      return { ...state, status: "error", error: action.payload };

    case ACTION_TYPE_ENTER_FORM_DETAILS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
