import axios from 'axios';

export const GET_COMMENTARY = "GET_COMMENTARY";
export const SUBMIT_COMMENTARY = "SUBMIT_COMMENTARY";

export function submitCommentary(text, rate){
    return async function(dispatch){
        let json = await axios.post("http://localhost:3001/products", {
            params: {
                text,
                rate
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