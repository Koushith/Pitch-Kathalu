import { createApi } from "@reduxjs/toolkit/dist/query/react";
import apiSlice from "./apiSlice";
import { SCRIPT_ENDPOINT } from "@/utils";

const scriptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // upload Script TODO: - Handle payment part
    uploadScript: builder.mutation({
      query: (data) => {
        console.log("Request Data:", data); // Log the request data
        return {
          url: SCRIPT_ENDPOINT,
          body: data,
          method: "POST",
        };
      },
    }),

    // fetch all uploads for particular user

    fetchScriptUploads: builder.query({
      query: (id) => {
        return {
          url: `${SCRIPT_ENDPOINT}/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

// Rest of your code...

export const { useUploadScriptMutation, useFetchScriptUploadsQuery } =
  scriptApiSlice;
