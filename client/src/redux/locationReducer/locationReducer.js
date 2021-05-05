import {
  POST_LOCATION,
  POST_LOCATION_ERROR,
  PUT_LOCATION,
  RESET_LOCATION,
  GET_CENTERS,
  DELETE_CENTER,
} from './locationActions';

const initialState = {
  centersLoaded: [],
  locationCreated: null,
  locationModified: null,
  error: null,
  centerDeleted: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_LOCATION:
      return {
        ...state,
        locationCreated: action.payload,
      };
    case POST_LOCATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case PUT_LOCATION:
      return {
        ...state,
        locationModified: action.payload,
      };
    case RESET_LOCATION:
      return {
        ...state,
        locationCreated: null,
        locationModified: null,
        error: null,
        centerDeleted: null,
      };
    case GET_CENTERS:
      return {
        ...state,
        centersLoaded: action.payload,
      };
    case DELETE_CENTER:
      return {
        ...state,
        centerDeleted: action.payload,
      };
    default:
      return { ...state };
  }
};
