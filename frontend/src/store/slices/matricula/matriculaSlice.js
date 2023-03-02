import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matriculas: [],
    matriculasLoading: true,
    onShowAlert: false
};

const matriculaSlice = createSlice({
  name: 'matricula',
  initialState,
  reducers: {
    setMatriculas: (state, action) => {
        state.matriculas = action.payload.data;
        state.matriculasLoading = false;
    },
    setMatriculasLoading: (state) => {
      state.matriculasLoading = true;
    },
    setMatriculasLoaded: (state) => {
      state.matriculasLoading = false;
    },
    setOnShowAlert: (state) => {
      state.onShowAlert = true;
    },
    setOnHideAlert: (state) => {
      state.onShowAlert = false;
    }
  },
});

export const { setMatriculas, setMatriculasLoading, setMatriculasLoaded, setOnShowAlert, setOnHideAlert } = matriculaSlice.actions;
const matriculaReducer = matriculaSlice.reducer;

export default matriculaReducer;
