import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://assignment-4-cx2crmvrh-rakib13xgmailcoms-projects.vercel.app/api/v1",
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: () => ({}),
});
