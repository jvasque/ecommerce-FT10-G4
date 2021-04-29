import { POST_LOCATION, GET_ADDRESS, CLEAN_ADDRESS } from './locationActions';

const initialState = {
  locationCreated: {},
  autocomplete: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOCATION:
      return {
        ...state,
        locationCreated: action.payload,
      };
    case GET_ADDRESS:
      return {
        ...state,
        autocomplete: action.payload,
      };
    case CLEAN_ADDRESS:
      return {
        ...state,
        autocomplete: [],
      };
    default:
      return { ...state };
  }
};
