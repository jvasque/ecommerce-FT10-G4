import axios from 'axios';
export const GET_DETAIL='GET_DETAIL';

export function getDetail(id) {
    return function(dispatch) {
      return axios("http://localhost:3001/product")
      .then(json => {
        console.log(json)
        dispatch({ type: GET_DETAIL, payload: json})        
      })
    };
  };