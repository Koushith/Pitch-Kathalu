import { createApi } from "@reduxjs/toolkit/dist/query/react";
import apiSlice from "./apiSlice";
import { SCRIPT_ENDPOINT } from "@/utils";

const scriptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

// Rest of your code...

export const { useUploadScriptMutation } = scriptApiSlice;
