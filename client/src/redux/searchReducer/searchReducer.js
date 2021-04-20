import {
  GET_QUERY,
  RESET_QUERY,
  GET_OPTIONS,
  RESET_OPTIONS,
} from './searchActions';

const initialState = {
  query: [],
  queryStatus: false,
  findQuery: '',
  options: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERY: {
      return {
        ...state,
        findQuery: action.payload.find,
        queryStatus: true,
        query: action.payload.info,
      };
    }
    case GET_OPTIONS: {
      return {
        ...state,
        options: action.payload,
      };
    }
    case RESET_QUERY: {
      return {
        ...state,
        findQuery: '',
        queryStatus: false,
      };
    }
    case RESET_OPTIONS: {
      return {
        ...state,
        options: [],
      };
    }
    default:
      return state;
  }
};
