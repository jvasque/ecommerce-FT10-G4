import axios from 'axios';
import decode from 'jwt-decode';

export const LOGIN_ACTION_KEY = 'LOGIN_ACTION_KEY';
export const LOGIN_FB = 'LOGIN_FB';
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

export function postFbUser({ firstName, lastName, email, facebookUser }) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/users/facebook/${facebookUser}`
      );

      dispatch({
        type: LOGIN_ACTION_KEY,
        payload: json.data,
      });
    } catch (err) {
      // users/facebook/:id
      console.log(err);

      let json = await axios.post('http://localhost:3001/users/post', {
        data: {
          firstName,
          lastName,
          email,
          facebookUser,
          password: 'Default@12#$', // crear hashFunction
        },
      });
      dispatch({ type: LOGIN_FB, payload: json.data });
    }
  };
}
