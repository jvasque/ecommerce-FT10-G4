import axios from 'axios';
export const GET_QUERY='GET_QUERY';
export const RESET_QUERY='RESET_QUERY';

export function getQuery(find) {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/search?term=' + find);
    let q = {
      info: info.data,
      find,
    }
    dispatch({
      type: GET_QUERY,
      payload: q,
    });
  };
}

export function resetQuery() {
  return function(dispatch) {   
    dispatch({
      type: RESET_QUERY,
    });
  };
};

