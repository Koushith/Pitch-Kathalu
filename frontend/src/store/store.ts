import authReducer from "@/slices/authSlice";
import postReducer from "@/slices/postSlice";
import { apiSlice } from "@/slices/apiSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // TODO: add providers
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // all these are boilderplate stuff
  devTools: true,
});
