import { BACKEND_BASE_URL } from "@/utils";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
  }),
  tagTypes: ["User", "Pdf"],
  endpoints: (builder) => ({
    // Define other endpoints here as needed
  }),
});

// Export the apiSlice
export default apiSlice;
