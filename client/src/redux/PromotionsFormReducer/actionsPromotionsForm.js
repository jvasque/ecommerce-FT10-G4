import axios from 'axios';
export const POST_PROMOTIONS = "POST_PROMOTIONS";
export const DELETE_PROMOTIONS = "DELETE_PROMOTIONS";
export const PUT_PROMOTIONS = "PUT_PROMOTIONS";
//export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";
export const CLEAR_PROMOTION_FORM = "CLEAR_PRODUCT_FORM";

export function postPromotion(description, categoryCheck, products, discountDate, combo, days) {
    
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/promotions", {
            params: {
                description,
                categoryCheck,
                products,
                discountDate,
                combo,
                days
            }
        });
        return dispatch({ type: POST_PROMOTIONS, payload: json.data })
    }
}