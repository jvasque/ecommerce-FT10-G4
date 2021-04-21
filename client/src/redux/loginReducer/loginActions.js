import axios from "axios";
import decode from "jwt-decode";

export const LOGIN_ACTION_KEY = "LOGIN_ACTION_KEY";
export const LOG_OUT = "LOG_OUT";
export const LOG_FAIL = "LOG_FAIL";
export const LOG_SWAL = "LOG_SWAL";
export const LOG_GOOGLE = "LOG_GOOGLE";

export const LoginAction = (email, password) => {
  return async function (dispatch) {
    try {
      const info = await axios.post(`http://localhost:3001/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", info.data); // guardo mi token encryptado

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

export const GLogin = (response) => {
  return async function (dispatch) {
    try {
      // const info = await axios.get("http://localhost:3001/auth/google/login", {
      //   headers: { Authorization: `Bearer ${response.tokenId}` },
      // });
      const  info = await axios.post('http://localhost:3001/auth/google/login',{tokenId: response.tokenId});
      console.log(info.data);
      dispatch({
        type: LOG_GOOGLE,
        payload: info.data,
      });
    } catch (e) {
      dispatch({
        type: LOG_FAIL,
        payload: e,
      });
    }
  };
};
