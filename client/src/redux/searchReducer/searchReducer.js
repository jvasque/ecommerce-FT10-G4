import { GET_QUERY, RESET_QUERY } from "./searchActions";

const initialState = {
  query: [],
  queryStatus: false,
  findQuery: '',
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
    case RESET_QUERY: {
      return {
        ...state,
        findQuery: '',
        queryStatus: false,
      }
    }
  default:
    return state;
  }
};
