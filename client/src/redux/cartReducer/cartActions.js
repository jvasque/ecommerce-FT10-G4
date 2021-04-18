import axios from "axios";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const TOTAL = "TOTAL";
export const INCREMENTQ = "INCREMENTQ";
export const USERCART = "USERCART";
export const EMPTY = "EMPTY";

export function addProduct(product) {
  const userId = localStorage.getItem("user");
  if (userId !== "0") {
    axios.post(`http://localhost:3001/cart/${userId}/${product.id}`, {
      productId: product.id,
    });
  }
  return function (dispatch) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
}

export function deleteProduct(product) {
  const userId = localStorage.getItem("user");
  if (userId !== "0") {
    axios.delete(`http://localhost:3001/cart/${userId}/${product.id}`);
  }
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
  const userId = localStorage.getItem("user");
  if (userId !== "0") {
    axios.put(`http://localhost:3001/cart/user/${product.id}`, {
      id: product.id,
      quantity: value,
      userId: userId,
    });
  }
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
export function userLogged() {
  const userId = localStorage.getItem("user");
  return async function (dispatch) {
    const data = await axios.get(`http://localhost:3001/cart/${userId}/cart`);
    const products = await axios.get("http://localhost:3001/products");
    const productsId = data.data.map((x) => x.productId);

    dispatch({
      type: "USERCART",
      payload: {
        productsId,
        products,
      },
    });
  };
}

export function empty() {
  const userId = localStorage.getItem("user");
  if (userId !== "0") {
    axios.delete(`http://localhost:3001/cart/${userId}/items/delete`);
  }
  return function (dispatch) {
    dispatch({
      type: "EMPTY",
    });
  };
}
