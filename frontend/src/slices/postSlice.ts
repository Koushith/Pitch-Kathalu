import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = [...state, action.payload];
    },
  },
});

//@ts-ignore FIXME: add types later
export const { setPost } = postSlice.actions;
export default postSlice.reducer;
