import axios from "axios";
import { useProfile, useUser } from "context";
import { createContext, useContext, useReducer } from "react";
import { API_TO_POST_ADD_BOOKMARK, API_TO_POST_REMOVE_BOOKMARK } from "utils";

import {
  sharedReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  sharedInitialReducerState,
} from "reducer";

const BookmarksContext = createContext({
  dispatch: () => {},
  getBookmarksCall: () => {},
  postAddBookmarkCall: () => {},
  postRemoveBookmarkCall: () => {},
  postClearAllBookmarksCall: () => {},
  bookmarks: sharedInitialReducerState,
});

export const useBookmarks = () => useContext(BookmarksContext);

export const BookmarksProvider = ({ children }) => {
  const {
    dispatch: profileDispatch,
    profile: { data: profileData },
  } = useProfile();
  const {
    userState: { userAuthToken },
  } = useUser();
  const config = { headers: { authorization: userAuthToken } };

  const [bookmarks, dispatch] = useReducer(
    sharedReducer,
    sharedInitialReducerState
  );

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

      profileDispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: { ...profileData, bookmarks: response.data[propertyToGet] },
      });
    } catch (error) {
      dispatch({ type: ACTION_TYPE_ERROR, payload: error.message });
    }
  };

  const getBookmarksCall = () => {
    const { api, propertyToGet } = API_TO_POST_ADD_BOOKMARK;
    callAPI(() => axios.get(api, config), propertyToGet);
  };

  const postClearAllBookmarksCall = () => {
    const { api, propertyToGet } = API_TO_POST_ADD_BOOKMARK;
    callAPI(() => axios.post(api, {}, config), propertyToGet);
  };

  const postAddBookmarkCall = async (_id) => {
    const { api, propertyToGet } = API_TO_POST_ADD_BOOKMARK;
    callAPI(() => axios.post(`${api}/${_id}`, {}, config), propertyToGet);
  };

  const postRemoveBookmarkCall = async (_id) => {
    const { api, propertyToGet } = API_TO_POST_REMOVE_BOOKMARK;
    callAPI(() => axios.post(`${api}/${_id}`, {}, config), propertyToGet);
  };

  const value = {
    dispatch,
    bookmarks,
    getBookmarksCall,
    postAddBookmarkCall,
    postRemoveBookmarkCall,
    postClearAllBookmarksCall,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};
