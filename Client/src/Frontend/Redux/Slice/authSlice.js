import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    isLoggedIn: false,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true; // Set isLoggedIn to true when logging in
    },

    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false; // Set isLoggedIn to false when logging out
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
