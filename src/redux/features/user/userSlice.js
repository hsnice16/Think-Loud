import { userAPI } from "redux/api/userAPI";
import { createSlice } from "@reduxjs/toolkit";

const STATUS_ERROR = "error";
const STATUS_LOADING = "loading";
const STATUS_SUCCESS = "success";

export const initialState = {
  error: null,
  userUsername: "",
  userAuthToken: "",
  follow: {
    data: null,
    status: null,
    username: "",
  },
  profile: {
    data: null,
    status: STATUS_LOADING,
  },
  bookmarks: {
    data: null,
    status: STATUS_LOADING,
  },
  isUserAuthTokenExist: false,
};

const actionFollowPending = (state) => {
  state.follow.status = STATUS_LOADING;
};

const actionFollowRejected = (state, action) => {
  state.follow.username = "";
  state.follow.status = STATUS_ERROR;
  state.error = action.payload.data.error;
};

const actionFollowFulfilled = (state, action) => {
  state.follow.username = "";
  state.follow.data = action.payload;
  state.follow.status = STATUS_SUCCESS;
  state.profile.data = action.payload.user;
};

const actionBookmarksPending = (state) => {
  state.bookmarks.status = STATUS_LOADING;
};

const actionBookmarksRejected = (state, action) => {
  state.bookmarks.status = STATUS_ERROR;
  state.error = action.payload.data.error;
};

const actionBookmarksFulfilled = (state, action) => {
  state.profile.data = {
    ...state.profile.data,
    bookmarks: action.payload.bookmarks,
  };
  state.bookmarks.status = STATUS_SUCCESS;
  state.bookmarks.data = action.payload.bookmarks;
};

export const userSlice = createSlice({
  initialState,
  name: "user",

  reducers: {
    setUserProfile(state, action) {
      state.profile.data = action.payload;
    },

    setUserState(state, action) {
      return { ...state, ...action.payload };
    },

    setFollowUsername(state, action) {
      state.follow.username = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addMatcher(
        userAPI.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.profile.status = STATUS_SUCCESS;
          state.profile.data = action.payload.user;
        }
      )
      .addMatcher(
        userAPI.endpoints.getProfile.matchRejected,
        (state, action) => {
          state.profile.status = STATUS_ERROR;
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(userAPI.endpoints.getProfile.matchPending, (state) => {
        state.profile.status = STATUS_LOADING;
      })
      .addMatcher(
        userAPI.endpoints.getBookmarksCall.matchFulfilled,
        actionBookmarksFulfilled
      )
      .addMatcher(
        userAPI.endpoints.getBookmarksCall.matchRejected,
        actionBookmarksRejected
      )
      .addMatcher(
        userAPI.endpoints.getBookmarksCall.matchPending,
        actionBookmarksPending
      )
      .addMatcher(
        userAPI.endpoints.postClearAllBookmarksCall.matchFulfilled,
        actionBookmarksFulfilled
      )
      .addMatcher(
        userAPI.endpoints.postClearAllBookmarksCall.matchRejected,
        actionBookmarksRejected
      )
      .addMatcher(
        userAPI.endpoints.postClearAllBookmarksCall.matchPending,
        actionBookmarksPending
      )
      .addMatcher(
        userAPI.endpoints.postAddBookmarkCall.matchFulfilled,
        actionBookmarksFulfilled
      )
      .addMatcher(
        userAPI.endpoints.postAddBookmarkCall.matchRejected,
        actionBookmarksRejected
      )
      .addMatcher(
        userAPI.endpoints.postAddBookmarkCall.matchPending,
        actionBookmarksPending
      )
      .addMatcher(
        userAPI.endpoints.postRemoveBookmarkCall.matchFulfilled,
        actionBookmarksFulfilled
      )
      .addMatcher(
        userAPI.endpoints.postRemoveBookmarkCall.matchRejected,
        actionBookmarksRejected
      )
      .addMatcher(
        userAPI.endpoints.postRemoveBookmarkCall.matchPending,
        actionBookmarksPending
      )
      .addMatcher(
        userAPI.endpoints.postFollowCall.matchFulfilled,
        actionFollowFulfilled
      )
      .addMatcher(
        userAPI.endpoints.postFollowCall.matchRejected,
        actionFollowRejected
      )
      .addMatcher(
        userAPI.endpoints.postFollowCall.matchPending,
        actionFollowPending
      )
      .addMatcher(
        userAPI.endpoints.postUnfollowCall.matchFulfilled,
        actionFollowFulfilled
      )
      .addMatcher(
        userAPI.endpoints.postUnfollowCall.matchRejected,
        actionFollowRejected
      )
      .addMatcher(
        userAPI.endpoints.postUnfollowCall.matchPending,
        actionFollowPending
      );
  },
});

export const { reducer } = userSlice;
export const { setUserState, setUserProfile, setFollowUsername } =
  userSlice.actions;
