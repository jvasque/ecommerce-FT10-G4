import {
  LOGIN_ACTION_KEY,
  LOGIN_FB,
  LOG_FAIL,
  LOG_OUT,
  LOG_SWAL,
  LOG_GOOGLE,
} from "./loginActions";
import decode from "jwt-decode";

const initialState = {
  error: {},
  errorLogin: false,
  isLogin: false,
  isAdmin: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      localStorage.setItem("user", JSON.stringify(action.payload.id));
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        isAdmin: action.payload.type.includes("admin"),
        errorLogin: false,
        error: {},
      };
    case LOG_FAIL:
      return {
        ...state,
        errorLogin: true,
        error: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        isLogin: false,
        isAdmin: false,
      };
    case LOG_SWAL:
      return {
        errorLogin: false,
      };

    case "CHANGEUSER": {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    }
    // case LOGIN_FB:
    //   localStorage.setItem('user', JSON.stringify(action.payload.id));
    //   return {
    //     ...state,
    //     user: action.payload,
    //     isLogin: true,
    //     isAdmin: action.payload.type.includes('admin'),
    //     errorLogin: false,
    //     error: {},
    //   };
    default:
      return { ...state };
  }
};
