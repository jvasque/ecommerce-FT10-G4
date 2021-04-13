import { ADD_PRODUCT, DELETE_PRODUCT, TOTAL } from "./cartActions";

const initialState = {
  cart: [],
  total: 0,
};

export default (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        cart: state.cart.filter(
          (x) => x.productId !== action.payload.productId
        ),
      };
    }
    case TOTAL: {
      return {
        ...state,
        total: state.cart.reduce((acc, e) => acc + e.unitPrice, 0),
      };
    }
    default:
      return state;
  }
};
