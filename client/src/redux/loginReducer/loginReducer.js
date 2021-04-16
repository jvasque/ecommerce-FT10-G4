import { LOGIN_ACTION_KEY, LOG_OUT } from "./loginActions";

const initialState = {
  user: {},
  isLogin: false,
  isAdmin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    default:
      return { ...state };
  }
};
