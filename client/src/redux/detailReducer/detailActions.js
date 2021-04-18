import axios from 'axios';
import decode from "jwt-decode";
export const GET_DETAIL='GET_DETAIL';

export function getDetail(id) {
    return function(dispatch) {
      
      return axios(`http://localhost:3001/products/${id}`)
      .then(json => {
        
        dispatch({ type: GET_DETAIL, payload: json.data})        
      })
    };
  }; 