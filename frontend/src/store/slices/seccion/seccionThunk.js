import { mainEndpoint } from "api/apiConfig";
import { setSecciones } from "./seccionSlice";

const obtenerTodasSecciones = () => {
    return async (dispatch, getState) => {
      const secciones = await mainEndpoint.get(`seccion`);
      if(secciones){
        dispatch(setSecciones(secciones));
      }
     
    };
};

export {
  obtenerTodasSecciones
};
