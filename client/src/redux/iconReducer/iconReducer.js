import { MODIFY_CART, MODIFY_FAV } from "./iconActions";

const initialState = {
  fav: {},
  cart: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_CART: {
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
      };
    }
    case MODIFY_FAV: {
      return {
        ...state,
        fav: { ...state.fav, ...action.payload },
      };
    }
    default:
      return state;
  }
};
