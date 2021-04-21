import axios from 'axios';

export const GET_COMMENTARY = "GET_COMMENTARY";
export const SUBMIT_COMMENTARY = "SUBMIT_COMMENTARY";
export const DELETE_COMMENTARY = "DELETE_COMMENTARY";
export const MODIFY_COMMENTARY = "MODIFY_COMMENTARY";
export const HAS_BUY = "HAS_BUY";
export const GET_PRODUCT_SCORE = "GET_PRODUCT_SCORE";

export function submitCommentary(text, rate, productId, userId){
    return async function(dispatch){
        await axios.post(`http://localhost:3001/products/${productId}/review`, {
            params: {
                text,
                rate,
                userId
            }
        });
    }
}

export function getCommentary(id){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/products/${id}/review`)
        return dispatch({type: GET_COMMENTARY, payload: json});
    }
}

export function deleteCommentary(id){
    return async function (){
        await axios.delete(`http://localhost:3001/products/${id}/review`)
    }
}

export function modifyCommentary(id, text, rate){
    return async function (){
        await axios.put(`http://localhost:3001/products/${id}/review`, {
            params:{
                text,
                rate
            }
        })
    }
}

export function getHasBuy(id){
    return async function (dispatch){
        let json = await axios.get(`http://localhost:3001/products/${id}/review-order-details/`);
        return dispatch({type: HAS_BUY, payload: json});
    }
}

export function getProductScore(id){
    return async function (dispatch){
        let json = await axios.get(`http://localhost:3001/products/${id}/review-product-score`);
        return dispatch({type: GET_PRODUCT_SCORE, payload: json});
    }
}