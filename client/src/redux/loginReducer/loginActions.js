import axios from "axios";
import decode from "jwt-decode";

export const LOGIN_ACTION_KEY = 'LOGIN_ACTION_KEY';
export const LOGIN_FB = 'LOGIN_FB';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAIL = 'LOG_FAIL';
export const LOG_SWAL = 'LOG_SWAL';
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

export const FLogin = (token, id) => {
  // console.log("don id",id)
  // console.log("don id", token)
  return async function (dispatch) {
    try {
      const info = await axios.post("http://localhost:3001/auth/facebook/login", {
        accessToken: token,
        userID: id
   
      });
      // console.log(info)
      localStorage.setItem("token", info.data);

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




export const GLogin = (response) => {
  console.log(response)
  return async function (dispatch) {
    try {
      const info = await axios.post("http://localhost:3001/auth/google/login", {
        tokenId:  response.tokenId,
        //
      });
      localStorage.setItem("token", info.data);

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
      dispatch({ type: LOGIN_ACTION_KEY, payload: json.data });
    }
  };
}
