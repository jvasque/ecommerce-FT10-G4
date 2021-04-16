import axios from "axios";
import decode from "jwt-decode";

export const LOGIN_ACTION_KEY = "LOGIN_ACTION_KEY";

export const LOG_OUT = "LOG_OUT";
export const LOG_FAIL = "LOG_FAIL";

export const LoginAction = (email, password) => {
  
  return async function (dispatch) {
    try{
      const info = await axios
      .post(`http://localhost:3001/auth/login`, { email, password })
      
    console.log(info);
    dispatch({
      type: LOGIN_ACTION_KEY,
      payload: decode(info.data),
    });
  } catch(e){
    console.log(e)
    dispatch({
      type: LOG_FAIL,
      payload: e
    });
  }
  };
};

export const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};
