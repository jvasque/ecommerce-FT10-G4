import axios from 'axios';
import decode from 'jwt-decode';

export const LOGIN_ACTION_KEY = 'LOGIN_ACTION_KEY';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAIL = 'LOG_FAIL';
export const LOG_SWAL = 'LOG_SWAL';

export const LoginAction = (email, password) => {
  return async function (dispatch) {
    try {
      const info = await axios.post(`http://localhost:3001/auth/login`, {
        email,
        password,
      });
      //console.log(info.data);
      localStorage.setItem('token', info.data); // guardo mi token encryptado

      //console.log(decode(info.data));
      dispatch({
        type: LOGIN_ACTION_KEY,
        payload: decode(info.data),
      });
    } catch (e) {
      dispatch({
        type: LOG_FAIL,
        payload: e,
      });
    }
  };
};

export const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const SwalBoo = () => {
  return {
    type: LOG_SWAL,
  };
};
