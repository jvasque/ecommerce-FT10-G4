import axios from "axios";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const TOTAL = "TOTAL";
export const INCREMENTQ = "INCREMENTQ";

var userId = 1;

export function addProduct(product) {
  axios.post(`http://localhost:3001/cart/${userId}/${product.id}`, {
    productId: product.id,
  });
  return function (dispatch) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
}

export function deleteProduct(product) {
  axios.delete(`http://localhost:3001/cart/${userId}/${product.id}`);
  return function (dispatch) {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product.id,
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
  axios.put(`http://localhost:3001/cart/user/${product.id}`, {
    id: product.id,
    quantity: value,
    userId: userId,
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
