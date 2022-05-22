import { baseAPI } from "redux/api/baseAPI";

export const postsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/",
    }),
  }),
});

export const { useGetPostsQuery } = postsAPI;
