import axios from "axios";
export const GET_CATALOG = "GET_CATALOG";

export function getCatalog() {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/products");
    dispatch({
      type: GET_CATALOG,
      payload: info.data,
    });
  };
}
