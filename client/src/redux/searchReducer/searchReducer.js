import { GET_QUERY, RESET_QUERY } from "./searchActions";

const initialState = {
  query: [],
  queryStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERY: {
      return {
        ...state,
        queryStatus: true,
        query: action.payload,
      };
    }
    case RESET_QUERY: {
      return {
        ...state,
        queryStatus: false,
      }
    }
  default:
    return state;
  }
};
