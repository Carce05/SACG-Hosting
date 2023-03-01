import { mainEndpoint } from "api/apiConfig";
import { setMatriculas, setMatriculasLoaded, setMatriculasLoading, setOnHideAlert, setOnShowAlert } from "./matriculaSlice";


const agregarMatricula = (matricula) => {
  return async (dispatch, getState) => {
    const { data } = await mainEndpoint.post(
      `matricula`,
      {
        ...matricula
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

export {
    obtenerMatriculas,
    agregarMatricula,
    onShowAlert
};
