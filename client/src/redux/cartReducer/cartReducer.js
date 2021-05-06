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
  location: 0,
};

function havePromotion(e){
  let productPromotion = e || false;
  if(!productPromotion) return 1;
  if (productPromotion) {
    //Los ordeno para tomar la mejor promocion para el consumidor, la mejor promocion quedara (en caso de existir) en la posicion 0
    productPromotion = productPromotion.sort(
      (a, b) => b.discountDate - a.discountDate
    );
  }

  return (productPromotion[0]?.discountDate /100) // 0.45, 0.75, etc ...
}

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
      let totalP = state.cart.reduce(
        (acc, e) => acc + e.unitPrice * (e.quantity ? e.quantity : 1) * ((-(havePromotion(e.promotions) - 1)) || 1), //0.80 - 1  = -0.20 * -1 = 0.20
        0
      );
      totalP = parseFloat(totalP.toFixed(2));
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
    case "LOCATION": {
      return {
        ...state,
        location: parseInt(action.payload),
      };
    }

    default:
      return state;
  }
};
