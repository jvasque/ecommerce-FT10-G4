import axios from "axios";
export const POST_PROMOTIONS = "POST_PROMOTIONS";
export const DELETE_PROMOTIONS = "DELETE_PROMOTIONS";
export const PUT_PROMOTIONS = "PUT_PROMOTIONS";
export const GET_PROMOTIONS = "GET_PROMOTIONS";
export const CLEAR_PROMOTION_FORM = "CLEAR_PRODUCT_FORM";

export function postPromotion(
  description,
  categoryCheck,
  products,
  discountDate,
  combo,
  days
) {
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/promotions", {
      params: {
        description,
        categoryCheck,
        products,
        discountDate,
        combo,
        days,
      },
    });
    return dispatch({ type: POST_PROMOTIONS, payload: json.data });
  };
}

export function getPromotion() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const json = await axios.get("http://localhost:3001/promotions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return dispatch({ type: GET_PROMOTIONS, payload: json.data });
  };
}
