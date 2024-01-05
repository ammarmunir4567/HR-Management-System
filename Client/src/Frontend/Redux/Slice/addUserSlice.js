// usernameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = '';
    },
  },
});

export const { setUsername, clearUsername } = usernameSlice.actions;
export const selectUsername = (state) => state.username.username;  // Corrected selector
export default usernameSlice.reducer;
