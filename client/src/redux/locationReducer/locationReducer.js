import {
   POST_LOCATION,
   RESET_LOCATION,
   POST_LOCATION_ERROR,
   RESET_ERROR,
   GET_CENTERS,
   DELETE_CENTER,
   MODIFY_CENTER,
   RESET_DELETED
 } from './locationActions';

const initialState = {
  centersLoaded: [],
  locationCreated: null,
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
    case RESET_LOCATION:
      return {
        ...state,
        locationCreated: null,
      };
    case POST_LOCATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case RESET_DELETED:
      return {
        ...state,
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
    case MODIFY_CENTER:
      return {
        ...state,        
      };
    default:
      return { ...state };
  }
};
