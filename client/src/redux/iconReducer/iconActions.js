export const MODIFY_CART = 'MODIFY_CART';
export const MODIFY_FAV = 'MODIFY_FAV';
export const RESET = 'RESET';

export function modifyCart(cart) {
  return function (dispatch) {
    dispatch({
      type: MODIFY_CART,
      payload: cart,
    });
  };
}

export function modifyFav(fav) {
  return function (dispatch) {
    dispatch({
      type: MODIFY_FAV,
      payload: fav,
    });
  };
}

export function reset() {
  return function (dispatch) {
    dispatch({
      type: RESET,
    });
  };
}
