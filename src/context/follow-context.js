import axios from "axios";
import { useUser } from "context";
import { createContext, useContext, useReducer } from "react";
import { API_TO_POST_FOLLOW_USER, API_TO_POST_UNFOLLOW_USER } from "utils";
import {
  followReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  sharedInitialReducerState,
} from "reducer";

const FollowContext = createContext({
  dispatch: () => {},
  postFollowCall: async () => {},
  postUnfollowCall: async () => {},
  follow: { ...sharedInitialReducerState, status: null, username: "" },
});

export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {
  const {
    userState: { userAuthToken },
  } = useUser();
  const config = { headers: { authorization: userAuthToken } };

  const [follow, dispatch] = useReducer(followReducer, {
    ...sharedInitialReducerState,
    status: null,
    username: "",
  });

  const postFollowCall = async (username) => {
    const { api } = API_TO_POST_FOLLOW_USER;

    try {
      dispatch({ type: ACTION_TYPE_LOADING, payload: username });

      const response = await axios.post(`${api}/${username}`, {}, config);

      dispatch({ type: ACTION_TYPE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTION_TYPE_ERROR, payload: error.message });
    }
  };

  const postUnfollowCall = async (username) => {
    const { api } = API_TO_POST_UNFOLLOW_USER;

    try {
      dispatch({ type: ACTION_TYPE_LOADING, payload: username });

      const response = await axios.post(`${api}/${username}`, {}, config);

      dispatch({ type: ACTION_TYPE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ACTION_TYPE_ERROR, payload: error.message });
    }
  };

  const value = { follow, dispatch, postFollowCall, postUnfollowCall };

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
};
