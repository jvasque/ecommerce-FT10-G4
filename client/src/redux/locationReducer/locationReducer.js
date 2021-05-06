import {
  POST_LOCATION,
  POST_LOCATION_ERROR,
  PUT_LOCATION,
  RESET_LOCATION,
  GET_CENTERS,
  DELETE_CENTER,
  GET_TIMES,
  CREATE_TIMESLOT,
  RESET_TIMESLOT
} from './locationActions';

const initialState = {
  centersLoaded: [],
  locationCreated: null,
  locationModified: null,
  error: null,
  centerDeleted: null,
  allDays: null,
  oneDay: null,
  createdTimeslot: null,
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
    case GET_TIMES:
      return {
        ...state,
        unavailableTimeslots: action.payload,
      };
    case CREATE_TIMESLOT:
      return {
        ...state,
        createdTimeslot: action.payload,
      };
    case RESET_TIMESLOT:
      return {
        ...state,
        createdTimeslot: null,
      };
    default:
      return { ...state };
  }
};
