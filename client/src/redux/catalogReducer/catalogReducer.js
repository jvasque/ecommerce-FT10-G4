import { GET_CATALOG } from "./catalogActions";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATALOG: {
      return {
        ...state,
        products: action.payload,
      };
    }
  default:
    return state;
  }
};