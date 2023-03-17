import { mainEndpoint } from "api/apiConfig";
import { setCurrentUser, setUpdatedUser, setUpdatedUserFalse } from "auth/authSlice";


const actualizarUsuario = (usuario, id ) => {
  return async (dispatch, getState) => {
    const { formName, formEmail, formThumb } = usuario;
    const { data } = await mainEndpoint.put(
      `/usuarios/${ id }`,
      {
        "name": formName,
        "thumb": formThumb,
        "email": formEmail,
      },
    );
    const { currentUser = '', loginDateTime, isLogged } = JSON.parse(localStorage.getItem('loginState'));
    localStorage.setItem('loginState', JSON.stringify({
        isLogged,
        loginDateTime,
        currentUser: {
            ...currentUser,
            name: formName,
            email: formEmail,
            thumb: formThumb
        }
    }));
      dispatch(setCurrentUser({
        ...currentUser,
        name: formName,
        email: formEmail,
        thumb: formThumb
    }));
    dispatch(setUpdatedUser());
    setTimeout(() => {
        dispatch(setUpdatedUserFalse());
    }, 2000)
  };
};

const actualizarUsuarioFromAdmin = (usuario, id ) => {
  return async (dispatch, getState) => {
    console.log(usuario)
    const { data } = await mainEndpoint.put(
      `/usuarios/${ id }`,
      {
        ...usuario
      },
    );
    dispatch(setUpdatedUser());
    setTimeout(() => {
        dispatch(setUpdatedUserFalse());
    }, 2000)
  }
};
const agregarUsuarioFromAdmin = (usuario, id ) => {
  return async (dispatch, getState) => {
    console.log(usuario)
    const { data } = await mainEndpoint.post(
      `/usuarios`,
      {
        ...usuario
      },
    );
    dispatch(setUpdatedUser());
    setTimeout(() => {
        dispatch(setUpdatedUserFalse());
    }, 2000)
  }
};

export {
    actualizarUsuario,
    actualizarUsuarioFromAdmin,
    agregarUsuarioFromAdmin
};
