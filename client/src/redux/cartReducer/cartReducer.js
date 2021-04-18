import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  TOTAL,
  INCREMENTQ,
  USERLOGGED,
  EMPTY,
} from "./cartActions";

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
      const totalP = state.cart.reduce(
        (acc, e) => acc + e.unitPrice * (e.quantity ? e.quantity : 1),
        0
      );
      parseFloat(totalP.toFixed(2));
      return {
        ...state,
        total: totalP,
      };
    }

    case INCREMENTQ: {
      const newCart = state.cart.find(
        (product) => product.id === action.payload.product.id
      );
      if (action.payload.value > 0) {
        newCart.quantity = action.payload.value;
      }
      return {
        ...state,
      };
    }
    case USERLOGGED: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case EMPTY: {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};
