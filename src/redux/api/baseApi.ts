import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://assignment-4-lake-ten.vercel.app/api/v1",
  baseUrl: "https://assignment-4-client-amber.vercel.app/api/v1",
  // baseUrl: "/api/v1",
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: () => ({}),
});
