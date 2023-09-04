// This is like a main entry point for all api related things.
// you can define all queires, mutations here or can inject programatically
// add this to the root store

import { BACKEND_BASE_URL } from "@/utils";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
  }),
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({
    // endpoints will be injected programatically
  }),
});
