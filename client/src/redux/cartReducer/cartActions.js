import axios from "axios";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const INCREMENTQ = "INCREMENTQ";
export const TOTAL = "TOTAL";

export function addProduct(product) {
  axios.post(`http://localhost:3001/cart/user/${product.productId}`, {
    productId: product.productId,
  });
  return function (dispatch) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
} 

export function deleteProduct(product) {
  axios.delete(`http://localhost:3001/cart/user/${product.productId}`);
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
export function incrementQ(product, value) {
  axios.put(`http://localhost:3001/cart/user/${product.productId}`, {
    productId: product.productId,
    quantity: value,
  });
  return function (dispatch) {
    dispatch({
      type: "INCREMENTQ",
      payload: {
        product,
        value,
      },
    });
  };
}
