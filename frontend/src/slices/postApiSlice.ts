import { POST_ENDPOINT } from "@/utils";

import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetches all post
    fetchAllPost: builder.query({
      query: () => ({
        url: `${POST_ENDPOINT}`,
        method: "GET", // you can ignore method for queries
      }),
      keepUnusedDataFor: 5,
    }),

    // Fetches one post based on ID
    fetchOnePost: builder.query({
      query: (id) => ({
        url: `${POST_ENDPOINT}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    // Create Post
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POST_ENDPOINT}`,
        method: "POST",
        body: data,
      }),
    }),

    // Delete Post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),

    // Update Post
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POST_ENDPOINT}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Get the verification status
    getVerificationStatus: builder.query({
      query: (callbackID) => ({
        url: `${POST_ENDPOINT}/status/${callbackID}`,
      }),
    }),
  }),
});

export const {
  useFetchAllPostQuery,
  useFetchOnePostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetVerificationStatusQuery,
} = postApiSlice;
