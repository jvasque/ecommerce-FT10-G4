import { POST_LOCATION } from "./postUserActions";


const initialState = { 
  location: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOCATION:
      return {
        ...state,
      };
    default:
      return { ...state };
    }
};
