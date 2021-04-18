import { POST_FAIL, POST_STATUS, POST_SUCCESS, POST_USER } from "./postUserActions";


const initialState = {
  
  error: {},
  errorMail: false,
  success: false
 
 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_USER:
      return {
        ...state,
        success:true
      };
      case POST_SUCCESS:
        return{
          ...state,
          success:false
        }
    case POST_FAIL:
      return {
        ...state,
        error: action.payload,
       errorMail: true,
      };
      case POST_STATUS:
        return {
            errorMail:false
        }
    default:
      return { ...state };
  }
};
