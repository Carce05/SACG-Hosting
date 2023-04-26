import { mainEndpoint } from "api/apiConfig";
import { setMatriculas, setMatriculasFiltradas, setMatriculasLoaded, setMatriculasLoading, setOnHideAlert, setOnShowAlert, setmatricularActivado } from "./matriculaSlice";


const agregarMatricula = (matricula) => {
  return async (dispatch, getState) => {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    const { data } = await mainEndpoint.post(
      `matricula`,
      {
        ...matricula,
        estadoMatriculaAdmin: "Pendiente",
        seccionMatriculaAdmin: "",
        fechaCreacionMatricula: formattedDateTime
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
        const configuracionMatricula = await mainEndpoint.get(`general/643f20fe9a24456baf1c57b1`);
        dispatch(setmatricularActivado(configuracionMatricula.data[0].matriculaActivator));
      }
    };
};


const onShowAlert = () => {
  return async (dispatch, getState) => {
    dispatch(setOnShowAlert());
    setTimeout(() => {
      dispatch(setOnHideAlert());
      dispatch(setMatriculasLoaded())
    }, 1000)
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
