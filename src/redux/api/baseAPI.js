import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  reducerPath: "api",
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
});
