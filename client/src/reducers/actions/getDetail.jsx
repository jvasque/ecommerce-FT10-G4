import axios from 'axios'

export const GETDETAIL = 'GET_DETAIL';

export const GetDetail = (id) => {
    return function (dispatch) {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((r) => r.data)
          .then((data) => {
            dispatch({
              type: GETDETAIL,
              payload: data,
            });
          });
      };
}