import axios from 'axios';
export const GET_QUERY='GET_QUERY';

export function getQuery(find) {
    return function(dispatch) {
      return axios("http://localhost:3001/search?query=" + find)
    //   .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_QUERY, payload: json.results })        
      })
    };
  };