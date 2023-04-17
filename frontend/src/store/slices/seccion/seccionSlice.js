import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  secciones: []
};

const seccionSlice = createSlice({
  name: 'seccion',
  initialState,
  reducers: {
    setSecciones: (state, action) => {
        state.secciones = action.payload.data;
    },
  },
});

export const { setSecciones } = seccionSlice.actions;
const seccionReducer = seccionSlice.reducer;

export default seccionReducer;
