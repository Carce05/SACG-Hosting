import { setCurrentUser } from "auth/authSlice";
import { useDispatch } from "react-redux";

export const useLogin = (initialForm = {}) => {
  const dispatch = useDispatch();
  const onUserLogin = ( usuario ) => {
    const date = new Date();
    localStorage.setItem('loginState', JSON.stringify({
      isLogged: true,
      loginDateTime: date,
      currentUser: usuario
    }));
  };
  
  const onCheckLogin = () => {
    if (localStorage.getItem('loginState') === null) {
      return false 
    }
    const { loginDateTime, currentUser } = JSON.parse(localStorage.getItem('loginState'));
    dispatch(setCurrentUser(currentUser));
    const currentDate = new Date();
    const timeFromLogged = (currentDate - Date.parse(loginDateTime)) / 1000;
    const timeLoging = 7200;
    return ( timeFromLogged < timeLoging ) && true; 
    
  }

  return {
    onUserLogin,
    onCheckLogin
  };
};
