import { postsAPI } from "redux/api/postsAPI";
import { createSlice } from "@reduxjs/toolkit";

const STATUS_ERROR = "error";
const STATUS_LOADING = "loading";
const STATUS_SUCCESS = "success";

const initialState = {
  data: null,
  error: null,
  likeStatus: "idle",
  deleteStatus: "idle",
  status: STATUS_LOADING,
  newCommentStatus: "idle",
  newBroadcastStatus: "idle",
  editBroadcastStatus: "idle",
};

const actionLikePending = (state) => {
  state.likeStatus = STATUS_LOADING;
};

const actionLikeRejected = (state, action) => {
  state.likeStatus = STATUS_ERROR;
  state.error = action.payload.data.error;
};

const actionLikeFulfilled = (state, action) => {
  state.likeStatus = STATUS_SUCCESS;
  state.data = action.payload.posts;
};

export const postsSlice = createSlice({
  initialState,
  name: "posts",
  extraReducers(builder) {
    builder
      .addMatcher(postsAPI.endpoints.getPosts.matchPending, (state) => {
        state.status = STATUS_LOADING;
      })
      .addMatcher(
        postsAPI.endpoints.getPosts.matchFulfilled,
        (state, action) => {
          state.status = STATUS_SUCCESS;
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.getPosts.matchRejected,
        (state, action) => {
          state.status = STATUS_ERROR;
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postLikeCall.matchPending,
        actionLikePending
      )
      .addMatcher(
        postsAPI.endpoints.postLikeCall.matchFulfilled,
        actionLikeFulfilled
      )
      .addMatcher(
        postsAPI.endpoints.postLikeCall.matchRejected,
        actionLikeRejected
      )
      .addMatcher(
        postsAPI.endpoints.postDisLikeCall.matchPending,
        actionLikePending
      )
      .addMatcher(
        postsAPI.endpoints.postDisLikeCall.matchFulfilled,
        actionLikeFulfilled
      )
      .addMatcher(
        postsAPI.endpoints.postDisLikeCall.matchRejected,
        actionLikeRejected
      )
      .addMatcher(
        postsAPI.endpoints.deleteBroadcastCall.matchPending,
        (state) => {
          state.deleteStatus = STATUS_LOADING;
        }
      )
      .addMatcher(
        postsAPI.endpoints.deleteBroadcastCall.matchFulfilled,
        (state, action) => {
          state.data = action.payload.posts;
          state.deleteStatus = STATUS_SUCCESS;
        }
      )
      .addMatcher(
        postsAPI.endpoints.deleteBroadcastCall.matchRejected,
        (state, action) => {
          state.deleteStatus = STATUS_ERROR;
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchPending,
        (state) => {
          state.newBroadcastStatus = STATUS_LOADING;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchFulfilled,
        (state, action) => {
          state.data = action.payload.posts;
          state.newBroadcastStatus = STATUS_SUCCESS;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchRejected,
        (state, action) => {
          state.newBroadcastStatus = STATUS_ERROR;
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchPending,
        (state) => {
          state.editBroadcastStatus = STATUS_LOADING;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchFulfilled,
        (state, action) => {
          state.data = action.payload.posts;
          state.editBroadcastStatus = STATUS_SUCCESS;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchRejected,
        (state, action) => {
          state.error = action.payload.data.error;
          state.editBroadcastStatus = STATUS_ERROR;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchPending,
        (state) => {
          state.newCommentStatus = STATUS_LOADING;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchFulfilled,
        (state, action) => {
          state.data = action.payload.posts;
          state.newCommentStatus = STATUS_SUCCESS;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchRejected,
        (state, action) => {
          state.newCommentStatus = STATUS_ERROR;
          state.error = action.payload.data.error;
        }
      );
  },
});

export const { reducer } = postsSlice;
