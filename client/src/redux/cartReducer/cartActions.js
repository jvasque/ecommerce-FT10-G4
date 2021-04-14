export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const TOTAL = "TOTAL";

export function addProduct(product) {
  return function (dispatch) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
}

export function deleteProduct(product) {
  return function (dispatch) {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product,
    });
  };
}

export function totalPrice() {
  return function (dispatch) {
    dispatch({
      type: "TOTAL",
    });
  };
}
