import { postsAPI } from "redux/api/postsAPI";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
  status: "loading",
  likeStatus: "idle",
  deleteStatus: "idle",
  newCommentStatus: "idle",
  newBroadcastStatus: "idle",
  editBroadcastStatus: "idle",
};

const actionLikePending = (state) => {
  state.likeStatus = "loading";
};

const actionLikeRejected = (state, action) => {
  state.likeStatus = "error";
  state.error = action.payload.data.error;
};

const actionLikeFulfilled = (state, action) => {
  state.likeStatus = "success";
  state.data = action.payload.posts;
};

export const postsSlice = createSlice({
  initialState,
  name: "posts",
  extraReducers(builder) {
    builder
      .addMatcher(postsAPI.endpoints.getPosts.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        postsAPI.endpoints.getPosts.matchFulfilled,
        (state, action) => {
          state.status = "success";
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.getPosts.matchRejected,
        (state, action) => {
          state.status = "error";
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
          state.deleteStatus = "loading";
        }
      )
      .addMatcher(
        postsAPI.endpoints.deleteBroadcastCall.matchFulfilled,
        (state, action) => {
          state.deleteStatus = "success";
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.deleteBroadcastCall.matchRejected,
        (state, action) => {
          state.deleteStatus = "error";
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchPending,
        (state) => {
          state.newBroadcastStatus = "loading";
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchFulfilled,
        (state, action) => {
          state.newBroadcastStatus = "success";
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewBroadcastCall.matchRejected,
        (state, action) => {
          state.newBroadcastStatus = "error";
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchPending,
        (state) => {
          state.editBroadcastStatus = "loading";
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchFulfilled,
        (state, action) => {
          state.editBroadcastStatus = "success";
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postEditedBroadcastCall.matchRejected,
        (state, action) => {
          state.editBroadcastStatus = "error";
          state.error = action.payload.data.error;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchPending,
        (state) => {
          state.newCommentStatus = "loading";
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchFulfilled,
        (state, action) => {
          state.newCommentStatus = "success";
          state.data = action.payload.posts;
        }
      )
      .addMatcher(
        postsAPI.endpoints.postNewCommentCall.matchRejected,
        (state, action) => {
          state.newCommentStatus = "error";
          state.error = action.payload.data.error;
        }
      );
  },
});

export const { reducer } = postsSlice;
