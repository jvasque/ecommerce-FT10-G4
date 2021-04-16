import { LOGIN_ACTION_KEY } from "./loginActions";

const initialState = {
  user: {},
  isLogin: false,
  isAdmin: false,
};

export default (state = initialState, action) => {
    console.log("holi")
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      console.log(action.payload);
      return {
       ...state,
        user: action.payload,
        isLogin: true,
        isAdmin: true
      };
    default:
      return { ...state };
  }
};
