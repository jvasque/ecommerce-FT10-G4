import { MODIFY_CART, MODIFY_FAV, RESET } from './iconActions';

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
      localStorage.setItem('Fav',
        JSON.stringify(Object.entries({...state.fav, ...action.payload}).filter(pair => {
          return pair[1]
        }).map( inFav => {
          return parseInt(inFav[0].substring(4))
        })))
      return {
        ...state,
        fav: { ...state.fav, ...action.payload },
      };
    }
    case RESET: {
      return {
        ...state,
        fav: {},
        cart: {},
      };
    }
    default:
      return state;
  }
};
