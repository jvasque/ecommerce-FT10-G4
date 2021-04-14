import axios from 'axios';
export const GET_QUERY = 'GET_QUERY';
export const RESET_QUERY = 'RESET_QUERY';
export const GET_OPTIONS = 'GET_OPTIONS';
export const RESET_OPTIONS = 'RESET_OPTIONS';

export function getQuery(find) {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/search?term=' + find);
    let q = {
      info: info.data,
      find,
    };
    dispatch({
      type: GET_QUERY,
      payload: q,
    });
  };
}
export function getOptions(option) {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/search?term=' + option);
    dispatch({
      type: GET_OPTIONS,
      payload: info.data,
    });
  };
}

export function resetQuery() {
  return function (dispatch) {
    dispatch({
      type: RESET_QUERY,
    });
  };
}

export function getOptions(option) {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/search?term=' + option);
    dispatch({
      type: GET_OPTIONS,
      payload: info.data,
    });
  };
}

export function resetOptions() {
  return function (dispatch) {
    dispatch({
      type: RESET_OPTIONS,
    });
  };
}
