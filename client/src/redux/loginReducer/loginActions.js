import axios from "axios";
import decode from "jwt-decode";

export const LOGIN_ACTION_KEY = "LOGIN_ACTION_KEY";
export const LOGIN_FB = "LOGIN_FB";
export const LOG_OUT = "LOG_OUT";
export const LOG_FAIL = "LOG_FAIL";
export const LOG_FAIL_HANDLE = "LOG_FAIL_HANDLE";
export const LOG_GOOGLE = "LOG_GOOGLE";
export const DOUBLE_AUTH = "DOUBLE_AUTH";
export const ADMIN_LOGIN = "ADMIN_LOGIN";

export const LoginAction = (email, password) => {
  return async function (dispatch) {
    try {
      const info = await axios.post(`http://localhost:3001/auth/login`, {
        email,
        password,
      });
      // console.log("status", decode(info.data).status)
      if (decode(info.data).status === "banned") {
        return dispatch({
          type: LOG_FAIL,
          payload: "Lo sentimos, su usuario no tiene permitido el ingreso.",
        });
      } else if (decode(info.data).status === "disabled") {
        return dispatch({
          type: LOG_FAIL,
          payload:
            "Hemos enviado instrucciones para reestablecer su password, en caso de haber pasado mas de 24 hrs. Favor vuelva a solicitar un reset de password.",
        });
      } else {
        console.log(decode(info.data).type.includes("admin"));
        if (decode(info.data).type.includes("admin")) {
          localStorage.setItem("token", info.data);
          dispatch({
            type: DOUBLE_AUTH,
          });
        } else {
          localStorage.setItem("token", info.data); // guardo mi token encryptado
          dispatch({
            type: LOGIN_ACTION_KEY,
            payload: decode(info.data),
          });
        }
      }
    } catch (e) {
      dispatch({
        type: LOG_FAIL,
        payload: "Su usuario o contraseña no es válido.",
      });
    }
  };
};

export const PostDoubleAuth = (number) => {
  console.log(number);
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const info = await axios.post(
        `http://localhost:3001/admin/doubleAuth`,
        {
          secretNumber: number,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
      localStorage.setItem("token", info.data);
      dispatch({
        type: ADMIN_LOGIN,
        payload: decode(info.data),
      });
    } catch (e) {}
  };
};

export const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const LogFailHandle = () => {
  return {
    type: LOG_FAIL_HANDLE,
  };
};

export const FLogin = (token, id) => {
  // console.log("don id",id)
  // console.log("don id", token)
  return async function (dispatch) {
    try {
      const info = await axios.post(
        "http://localhost:3001/auth/facebook/login",
        {
          accessToken: token,
          userID: id,
        }
      );
      console.log("status", decode(info.data).status);
      if (decode(info.data).status === "banned") {
        return dispatch({
          type: LOG_FAIL,
          payload: "Lo sentimos, su usuario no tiene permitido el ingreso.",
        });
      } else if (decode(info.data).status === "disabled") {
        return dispatch({
          type: LOG_FAIL,
          payload:
            "Hemos enviado instrucciones para reestablecer su password, en caso de haber pasado mas de 24 hrs. Favor vuelva a solicitar un reset de password.",
        });
      } else {
        console.log(decode(info.data).type.includes("admin"));
        if (decode(info.data).type.includes("admin")) {
          localStorage.setItem("token", info.data);
          dispatch({
            type: DOUBLE_AUTH,
          });
        } else {
          localStorage.setItem("token", info.data); // guardo mi token encryptado
          dispatch({
            type: LOGIN_ACTION_KEY,
            payload: decode(info.data),
          });
        }
      }
    } catch (e) {
      dispatch({
        type: LOG_FAIL,
        payload: e,
      });
    }
  };
};

export const GLogin = (response) => {
  console.log(response);
  return async function (dispatch) {
    try {
      const info = await axios.post("http://localhost:3001/auth/google/login", {
        tokenId: response.tokenId,
        //
      });

      console.log("status", decode(info.data).status);
      if (decode(info.data).status === "banned") {
        return dispatch({
          type: LOG_FAIL,
          payload: "Lo sentimos, su usuario no tiene permitido el ingreso.",
        });
      } else if (decode(info.data).status === "disabled") {
        return dispatch({
          type: LOG_FAIL,
          payload:
            "Hemos enviado instrucciones para reestablecer su password, en caso de haber pasado mas de 24 hrs. Favor vuelva a solicitar un reset de password.",
        });
      } else {
        console.log(decode(info.data).type.includes("admin"));
        if (decode(info.data).type.includes("admin")) {
          localStorage.setItem("token", info.data);
          dispatch({
            type: DOUBLE_AUTH,
          });
        } else {
          localStorage.setItem("token", info.data); // guardo mi token encryptado
          dispatch({
            type: LOGIN_ACTION_KEY,
            payload: decode(info.data),
          });
        }
      }
    } catch (e) {
      dispatch({
        type: LOG_FAIL,
        payload: "Lo sentimos, ha ocurrido un erorr. Vuelva a intentarlo.",
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

      let json = await axios.post("http://localhost:3001/users/post", {
        data: {
          firstName,
          lastName,
          email,
          facebookUser,
          password: "Default@12#$", // crear hashFunction
        },
      });
      dispatch({ type: LOGIN_ACTION_KEY, payload: json.data });
    }
  };
}
