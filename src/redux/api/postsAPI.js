import { authCookieHandler } from "utils";
import { baseAPI } from "redux/api/baseAPI";

const { getCookies } = authCookieHandler();
const allCookies = getCookies();
const headers = {
  authorization: allCookies.userAuthToken,
};

export const postsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
    }),

    postLikeCall: builder.mutation({
      query: (postId) => ({
        headers,
        body: {},
        method: "POST",
        url: `/posts/like/${postId}`,
      }),
    }),

    postDisLikeCall: builder.mutation({
      query: (postId) => ({
        headers,
        body: {},
        method: "POST",
        url: `/posts/dislike/${postId}`,
      }),
    }),

    deleteBroadcastCall: builder.mutation({
      query: (postId) => ({
        headers,
        method: "DELETE",
        url: `/user/posts/${postId}`,
      }),
    }),

    postNewBroadcastCall: builder.mutation({
      query: (postData) => ({
        headers,
        method: "POST",
        body: { postData },
        url: "/user/posts",
      }),
    }),

    postEditedBroadcastCall: builder.mutation({
      query: ({ postId, postData }) => ({
        headers,
        method: "POST",
        body: { postData },
        url: `/posts/edit/${postId}`,
      }),
    }),

    postNewCommentCall: builder.mutation({
      query: ({ postId, commentData }) => ({
        headers,
        method: "POST",
        body: { commentData },
        url: `/comments/add/${postId}`,
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
