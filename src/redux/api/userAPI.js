import { authCookieHandler } from "utils";
import { baseAPI } from "redux/api/baseAPI";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (username) => `/users/${username}`,
    }),

    getBookmarksCall: builder.query({
      query: () => ({
        url: "/users/bookmark",
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postClearAllBookmarksCall: builder.mutation({
      query: () => ({
        body: {},
        method: "POST",
        url: "/users/bookmark",
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postAddBookmarkCall: builder.mutation({
      query: (postId) => ({
        body: {},
        method: "POST",
        url: `/users/bookmark/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postRemoveBookmarkCall: builder.mutation({
      query: (postId) => ({
        body: {},
        method: "POST",
        url: `/users/remove-bookmark/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetBookmarksCallQuery,
  usePostAddBookmarkCallMutation,
  usePostRemoveBookmarkCallMutation,
  usePostClearAllBookmarksCallMutation,
} = userAPI;
