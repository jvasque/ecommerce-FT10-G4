import { LOGIN_ACTION_KEY, LOG_FAIL, LOG_OUT, LOG_SWAL } from "./loginActions";

const initialState = {
  user: {},
  error: {},
  errorLogin: false,
  isLogin: false,
  isAdmin: false,
  // Swal:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        errorLogin:  false,
        error:{}
      };
      case LOG_FAIL:
        return{
          ...state,
          errorLogin:  true,
          error:action.payload
        }
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLogin: false,
      };
      case LOG_SWAL:
        return {
          errorLogin:false
        }
    default:
      return { ...state };
  }
};
