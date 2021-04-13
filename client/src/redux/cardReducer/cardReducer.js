import { ADD_PRODUCT, DELETE_PRODUCT } from "./cardActions";

const initialState = {
  card: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        card: [...state.card, action.payload],
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        card: state.card.filter(
          (x) => x.productId !== action.payload.productId
        ),
      };
    }
    default:
      return state;
  }
};
