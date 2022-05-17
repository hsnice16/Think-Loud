import axios from "axios";
import { useUser } from "context";
import { useAsync } from "custom-hooks";
import { createContext, useContext } from "react";

import {
  API_TO_POST_LIKE,
  API_TO_POST_DISLIKE,
  API_TO_GET_ALL_POSTS,
  API_TO_POST_NEW_POST,
  API_TO_POST_EDITED_POST,
} from "utils";

import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  sharedInitialReducerState,
} from "reducer";

const PostsContext = createContext({
  dispatch: () => {},
  postLikeCall: () => {},
  postDisLikeCall: () => {},
  deleteBroadcastCall: () => {},
  postNewBroadcastCall: () => {},
  posts: sharedInitialReducerState,
  postEditedBroadcastCall: () => {},
});

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const {
    userState: { userAuthToken },
  } = useUser();
  const config = { headers: { authorization: userAuthToken } };

  const { state: posts, dispatch } = useAsync(API_TO_GET_ALL_POSTS);

  /**
   * callAPI - function to fetch response of API call
   *
   * @param {Function} callFunc - function making API call
   * @param {string} propertyToGet - property to get from response
   */
  const callAPI = async (callFunc, propertyToGet) => {
    try {
      dispatch({ type: ACTION_TYPE_LOADING });

      const response = await callFunc();

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });
    } catch (error) {
      dispatch({ type: ACTION_TYPE_ERROR, payload: error.message });
    }
  };

  const postLikeCall = (_id) => {
    const { api, propertyToGet } = API_TO_POST_LIKE;
    callAPI(() => axios.post(`${api}/${_id}`, {}, config), propertyToGet);
  };

  const postDisLikeCall = (_id) => {
    const { api, propertyToGet } = API_TO_POST_DISLIKE;
    callAPI(() => axios.post(`${api}/${_id}`, {}, config), propertyToGet);
  };

  const postNewBroadcastCall = (postData) => {
    const { api, propertyToGet } = API_TO_POST_NEW_POST;
    callAPI(() => axios.post(api, { postData }, config), propertyToGet);
  };

  const deleteBroadcastCall = (_id) => {
    const { api, propertyToGet } = API_TO_POST_NEW_POST;
    callAPI(() => axios.delete(`${api}/${_id}`, config), propertyToGet);
  };

  const postEditedBroadcastCall = (_id, postData) => {
    const { api, propertyToGet } = API_TO_POST_EDITED_POST;
    callAPI(
      () => axios.post(`${api}/${_id}`, { postData }, config),
      propertyToGet
    );
  };

  const value = {
    posts,
    dispatch,
    postLikeCall,
    postDisLikeCall,
    deleteBroadcastCall,
    postNewBroadcastCall,
    postEditedBroadcastCall,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
