import { authCookieHandler } from "utils";
import { baseAPI } from "redux/api/baseAPI";

export const postsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
    }),

    postLikeCall: builder.mutation({
      query: (postId) => ({
        body: {},
        method: "POST",
        url: `/posts/like/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postDisLikeCall: builder.mutation({
      query: (postId) => ({
        body: {},
        method: "POST",
        url: `/posts/dislike/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    deleteBroadcastCall: builder.mutation({
      query: (postId) => ({
        method: "DELETE",
        url: `/user/posts/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postNewBroadcastCall: builder.mutation({
      query: (postData) => ({
        method: "POST",
        body: { postData },
        url: "/user/posts",
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postEditedBroadcastCall: builder.mutation({
      query: ({ postId, postData }) => ({
        method: "POST",
        body: { postData },
        url: `/posts/edit/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),

    postNewCommentCall: builder.mutation({
      query: ({ postId, commentData }) => ({
        method: "POST",
        body: { commentData },
        url: `/comments/add/${postId}`,
        headers: {
          authorization: authCookieHandler().getCookies().userAuthToken,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  usePostLikeCallMutation,
  usePostDisLikeCallMutation,
  usePostNewCommentCallMutation,
  useDeleteBroadcastCallMutation,
  usePostNewBroadcastCallMutation,
  usePostEditedBroadcastCallMutation,
} = postsAPI;
