import { USER_ENDPOINT } from "@/utils";

import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USER_ENDPOINT,
        method: "POST",
        body: data,
      }),
    }),
    fetchProfileById: builder.query({
      query: (id) => ({
        url: `${USER_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),
    fetchAllUsers: builder.query({
      query: () => ({
        url: USER_ENDPOINT,
        method: "GET",
      }),
    }),
    fetchUserById: builder.query({
      query: (id) => ({
        url: `${USER_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

// Export the generated hooks
export const {
  useLoginMutation,
  useFetchProfileByIdQuery,
  useFetchAllUsersQuery,
  useFetchUserByIdQuery,
} = userApiSlice;
