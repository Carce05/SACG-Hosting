import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matriculas: [],
    matriculasLoading: true
};

const matriculaSlice = createSlice({
  name: 'matricula',
  initialState,
  reducers: {
    setMatriculas: (state, action) => {
        state.matriculas = action.payload.data;
        state.matriculasLoading = false;
      },
  },
});

export const { setMatriculas } = matriculaSlice.actions;
const matriculaReducer = matriculaSlice.reducer;

export default matriculaReducer;
