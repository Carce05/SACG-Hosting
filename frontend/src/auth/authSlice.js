import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  currentUser: {},
  isUpdated: false,
  cedulaExiste: false
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
    },
    setCedulaExiste(state, action) {
      state.cedulaExiste = action.payload;
    }
  },
});

export const { setCurrentUser, setUpdatedUser, setUpdatedUserFalse, setCedulaExiste } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
