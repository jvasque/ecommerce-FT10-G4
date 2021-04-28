import { POST_LOCATION } from "./locationActions";


const initialState = { 
  locationCreated: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOCATION:
      return {
        locationCreated: action.payload,
        ...state,
      };
    default:
      return { ...state };
    }
};
