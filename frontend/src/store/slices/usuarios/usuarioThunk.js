import { mainEndpoint } from "api/apiConfig";
import { setCurrentUser, setUpdatedUser, setUpdatedUserFalse } from "auth/authSlice";


const actualizarUsuario = (usuario, id ) => {
  return async (dispatch, getState) => {
    const { formName, formEmail, formPass } = usuario;
    const { data } = await mainEndpoint.put(
      `/usuarios/${ id }`,
      {
        "name": formName,
        "email": formEmail,
        'password': formPass
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
        }
    }));
      dispatch(setCurrentUser({
        ...currentUser,
        name: formName,
        email: formEmail,
    }));
    dispatch(setUpdatedUser());
    setTimeout(() => {
        dispatch(setUpdatedUserFalse());
    }, 2000)
  };
};

const actualizarUsuarioFromAdmin = (usuario, id ) => {
  return async (dispatch, getState) => {
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

const actualizarUserProfileImage = ( image, userId, updateImage ) => {
  return async (dispatch, getState) => {
    if (image.data.length !== 0) {
      const formData = new FormData();
      formData.append('image', image.data)
      formData.append('userId', userId)
      formData.append('updateImage', updateImage)
      const { data } = await mainEndpoint.post(
        `/usuarios/userimage`,
          formData
      );
      const { currentUser = '', loginDateTime, isLogged } = JSON.parse(localStorage.getItem('loginState'));
      localStorage.setItem('loginState', JSON.stringify({
          isLogged,
          loginDateTime,
          currentUser: {
              ...currentUser,
              thumb: data.imagePath
          }
      }));
        dispatch(setCurrentUser({
          ...currentUser,
          thumb: data.imagePath
      }));
    }
  }
}

const agregarUsuarioNuevo = (userToSave, image) => {
  return async (dispatch, getState) => {
    console.log(image.data.length !== 0)
    if (image.data.length !== 0) {
      const formData = new FormData();
      formData.append('image', image.data)
      formData.append('name', userToSave.name)
      formData.append('email', userToSave.email)
      formData.append('password', userToSave.password)
      formData.append('role', userToSave.role)
      formData.append('personalId', userToSave.personalId)
      formData.append('status', userToSave.status)

      const { data } = await mainEndpoint.post(
        `/usuarios/withimage`,
          formData
      );
      dispatch(setUpdatedUser());
      setTimeout(() => {
          dispatch(setUpdatedUserFalse());
      }, 2000)
    } else {
      const { data } = await mainEndpoint.post(
        `/usuarios`,
        {
          ...userToSave
        },
      );
      dispatch(setUpdatedUser());
      setTimeout(() => {
          dispatch(setUpdatedUserFalse());
      }, 2000)
    }
}}

export {
    actualizarUsuario,
    actualizarUsuarioFromAdmin,
    actualizarUserProfileImage,
    agregarUsuarioNuevo
};
