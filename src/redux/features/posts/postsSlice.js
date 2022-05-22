import { postsAPI } from "redux/api/postsAPI";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: "loading", data: null, error: null };

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
          state.error = action.payload.error;
        }
      );
  },
});

export const { reducer } = postsSlice;
