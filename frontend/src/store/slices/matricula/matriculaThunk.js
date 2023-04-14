import { mainEndpoint } from "api/apiConfig";
import { setMatriculas, setMatriculasFiltradas, setMatriculasLoaded, setMatriculasLoading, setOnHideAlert, setOnShowAlert } from "./matriculaSlice";


const agregarMatricula = (matricula) => {
  return async (dispatch, getState) => {
    const { data } = await mainEndpoint.post(
      `matricula`,
      {
        ...matricula,
        estadoMatriculaAdmin: "Pendiente",
        seccionMatriculaAdmin: "",
        fechaCreacionMatricula: new Date().toISOString().slice(0, 10)
      },
    );
    dispatch(setMatriculasLoaded())
  };
};


const obtenerMatriculas = () => {
    return async (dispatch, getState) => {
      const matriculas = await mainEndpoint.get(`matricula`);
      if(matriculas){
        dispatch(setMatriculas( {...matriculas} ));
      }
     
    };
};


const onShowAlert = () => {
  return async (dispatch, getState) => {
    dispatch(setOnShowAlert());
    setTimeout(() => {
      dispatch(setOnHideAlert());
      dispatch(setMatriculasLoaded())
    }, 2000)
  }
}  

const matriculaModificarEstado = (id, matriculaEstado) => {
  return async (dispatch, getState) => {
    console.log('first gd')
    const { data } = await mainEndpoint.put(
      `/matricula/matriculaModificarEstado/${ id }`,
      {
        ...matriculaEstado
      }
    );
    console.log(data)
  }
}

const matriculaFiltrar = ({ anioMostrarInforme, estadoMostrarInforme }) => {
  return async (dispatch, getState) => {
    const { data } = await mainEndpoint.post(
      `/matricula/matricular-filter`,
      {
        anioMostrarInforme: anioMostrarInforme,
        estadoMostrarInforme: estadoMostrarInforme
      },
    );
    console.log(estadoMostrarInforme)
    dispatch(setMatriculasFiltradas( data ));
  }}

export {
    obtenerMatriculas,
    agregarMatricula,
    onShowAlert,
    matriculaModificarEstado,
    matriculaFiltrar
};
