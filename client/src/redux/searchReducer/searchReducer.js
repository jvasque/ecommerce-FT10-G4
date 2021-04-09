import { GET_QUERY } from "./searchActions";

const initialState = {
  query: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }
  default:
    return state;
  }
};