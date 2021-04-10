import axios from 'axios'

export const GETDETAIL = 'GET_DETAIL';

export const GetDetail = (id) => {
    return function (dispatch) {
        axios
          .get(`http://localhost:3001/products/${id}`)
          .then((r) => r.data)
          .then((data) => {
            dispatch({
              type: GETDETAIL,
              payload: data,
            });
          });
      };
}