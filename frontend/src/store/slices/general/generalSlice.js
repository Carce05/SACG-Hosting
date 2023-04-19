import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  general: []
};

const generalSlice = createSlice({
  name: 'seccion',
  initialState,
  reducers: {
    setGenerales: (state, action) => {
        state.general = action.payload.data;
    },
  },
});

export const { setGenerales } = generalSlice.actions;
const generalReducer = generalSlice.reducer;

export default generalReducer;
