import { ADD_PRODUCT, DELETE_PRODUCT, TOTAL, INCREMENTQ } from "./cartActions";

const initialState = {
  cart: [],
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      action.payload.quantity = 1;
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        cart: state.cart.filter((x) => x.id !== action.payload),
      };
    }
    case TOTAL: {
      return {
        ...state,
        total: state.cart.reduce(
          (acc, e) => acc + Math.round(e.unitPrice * e.quantity),
          0
        ),
      };
    }

    case INCREMENTQ: {
      const newCart = state.cart.find(
        (product) => product.id === action.payload.product.id
      );
      if (action.payload.value > 0) {
        newCart.quantity = action.payload.value;
      }
    }
    default:
      return state;
  }
};
