export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function addProduct(product) {
  return function (dispath) {
    dispath({
      type: "ADD_PRODUCT",
      payload: product,
    });
  };
}

export function deleteProduct(product) {
  return function (dispath) {
    dispath({
      type: "DELETE_PRODUCT",
      payload: product,
    });
  };
}
