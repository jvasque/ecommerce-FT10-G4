import axios from 'axios';

export const GET_COMMENTARY = "GET_COMMENTARY";
export const SUBMIT_COMMENTARY = "SUBMIT_COMMENTARY";

export function submitCommentary(text, rate, productId){
    return async function(dispatch){
        let json = await axios.post(`http://localhost:3001/products/${productId}/review`, {
            params: {
                text,
                rate,
                productId
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