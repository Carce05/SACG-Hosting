import { mainEndpoint } from "api/apiConfig";
import { setMatriculas } from "./matriculaSlice";


const agregarMatricula = (matricula) => {
  return async (dispatch, getState) => {
    const { data } = await mainEndpoint.post(
      `matricula`,
      {
        ...matricula
      },
    );
  };
};


const obtenerMatriculas = () => {
    return async (dispatch, getState) => {
      const matriculas = await mainEndpoint.get(`matricula`);
      dispatch(setMatriculas( matriculas ));
    };
  };

export {
    obtenerMatriculas,
    agregarMatricula
};
