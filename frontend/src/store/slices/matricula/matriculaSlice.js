import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matriculas: [],
    matriculasLoading: true,
    onShowAlert: false,
    matriculasFiltradas: [],
    cantidadMatriculasFiltradas: 0,
    matricularActivado: false,
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
    },
    setmatricularActivado: (state, action) => {
      state.matricularActivado = action.payload;
    },
    setMatriculasFiltradas: (state, action) => {
      console.log()
      state.matriculasFiltradas = action.payload.matriculasfiltradas;
      state.cantidadMatriculasFiltradas = action.payload.cantidadMatriculasFiltradas
    },
  },
});

export const { setMatriculas, setMatriculasLoading, setMatriculasLoaded, setOnShowAlert, setOnHideAlert, setMatriculasFiltradas, setmatricularActivado } = matriculaSlice.actions;
const matriculaReducer = matriculaSlice.reducer;

export default matriculaReducer;
