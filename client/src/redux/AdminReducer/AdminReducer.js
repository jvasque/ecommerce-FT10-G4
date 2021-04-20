// import { GET_USERS } from "./AdminActions";

// const initialState = {
//     users: [],
    // error: {},
    // errorLogin: false,
    // isLogin: false,
    // isAdmin: false,
//   };
  
//   export default (state = initialState, action) => {
//     switch (action.type) {
//       case GET_USERS:
       
//         return {
//           ...state,
//           users: action.payload,
          
//         };
    //   case LOG_FAIL:
    //     return {
    //       ...state,
    //       errorLogin: true,
    //       error: action.payload,
    //     };
    //   case LOG_OUT:
    //     localStorage.removeItem('token');
    //     return {
    //       ...state,
    //       user: {},
    //       isLogin: false,
    //       isAdmin: false,
    //     };
    //   case LOG_SWAL:
    //     return {
    //       errorLogin: false,
    //     };
//       default:
//         return { ...state };
//     }
//   };