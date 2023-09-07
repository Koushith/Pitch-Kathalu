import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  isAuthendicated: false,
  mongoUserId: "",
  isAdmin: false,
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials: (state, action) => {
      console.log("inside slice", action.payload.mongoUserId);
      //@ts-ignore
      (state.mongoUserId = action.payload.mongoUserId),
        (state.isAuthendicated = true),
        (state.isAdmin = action.payload.isAdmin),
        //@ts-ignore // FIXME:- magic- it works -not sure how. but try to understand how
        (state.userInfo = { ...state.userInfo, ...action.payload });
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isAdmin = false;
      (state.mongoUserId = ""), (state.isAuthendicated = false);
      // clear the local storage
      localStorage.clear();
    },
  },
});
//@ts-ignore FIXME: add proper types
export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
