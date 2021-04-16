import axios from 'axios';

const SUBMIT_COMMENTARY = "SUBMIT_COMMENTARY";

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