import { baseAPI } from "redux/api/baseAPI";
import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "redux/features/user/userSlice";
import { reducer as postsReducer } from "redux/features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});
