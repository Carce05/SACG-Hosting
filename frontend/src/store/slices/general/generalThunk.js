import { mainEndpoint } from "api/apiConfig";
import { setGenerales } from "./generalSlice";


const actualizarGeneral = (general, id ) => {
  return async (dispatch, getState) => {
    const { formAnio, formPeriodo,  } = general;
    const { data } = await mainEndpoint.put(
      `/general/${ id }`,
      {
        "anio": formAnio,
        "periodo": formPeriodo,
      },
    );
      dispatch(setGenerales({
        anio: formAnio,
        periodo: formPeriodo,
    }));
  };
};


export {
    actualizarGeneral,
};
