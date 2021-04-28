import { POST_LOCATION } from "./locationActions";


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
