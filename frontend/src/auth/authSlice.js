import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  currentUser: {},
  isUpdated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    setUpdatedUser(state, action) {
      state.isUpdated = true;
    },
    setUpdatedUserFalse(state, action) {
      state.isUpdated = false;
    }
  },
});

export const { setCurrentUser, setUpdatedUser, setUpdatedUserFalse } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
