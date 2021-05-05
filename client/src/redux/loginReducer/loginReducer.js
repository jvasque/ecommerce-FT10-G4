import {
  LOGIN_ACTION_KEY,
  LOGIN_FB,
  LOG_FAIL,
  LOG_OUT,
  LOG_FAIL_HANDLE,
  DOUBLE_AUTH,
  ADMIN_LOGIN,
} from './loginActions';

const initialState = {
  error: {},
  errorLogin: false,
  isLogin: false,
  isAdmin: false,
  isDoubleAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      localStorage.setItem('user', JSON.stringify(action.payload.id));
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        // isAdmin: action.payload.type.includes("admin"),
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
      localStorage.removeItem('token');
      return {
        ...state,
        user: {},
        isLogin: false,
        isAdmin: false,
        isDoubleAuth: false,
      };
    case LOG_FAIL_HANDLE:
      return {
        ...state,
        errorLogin: false,
      };
    case DOUBLE_AUTH:
      return {
        ...state,
        isDoubleAuth: true,
      };
    case ADMIN_LOGIN:
      localStorage.setItem('user', JSON.stringify(action.payload.id));
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        isAdmin: action.payload.type.includes('admin'),
        errorLogin: false,
        error: {},
        isDoubleAuth: false,
      };
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
