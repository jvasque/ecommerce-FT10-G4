import axios from 'axios';
export const GET_CATALOG = 'GET_CATALOG';
export const INCREASE_PAGE = 'INCREASE_PAGE';
export const DECREASE_PAGE = 'DECREASE_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_DOLLAR = 'SET_DOLLAR';

export function getCatalog() {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/products');
    dispatch({
      type: GET_CATALOG,
      payload: info.data,
    });
  };
}

export function increasePage() {
  return function (dispatch) {
    dispatch({
      type: INCREASE_PAGE,
    });
  };
}

export function decreasePage() {
  return function (dispatch) {
    dispatch({
      type: DECREASE_PAGE,
    });
  };
}

export function setPage(page) {
  return function (dispatch) {
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  };
}

export function setDollar() {
  return async function (dispatch) {
    const info = await axios.get(
      'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
    );
    dispatch({
      type: SET_DOLLAR,
      payload: Math.floor(parseInt(info.data[1].casa.compra)),
    });
  };
}
