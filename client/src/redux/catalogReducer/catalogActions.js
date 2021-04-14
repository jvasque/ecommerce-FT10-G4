import axios from 'axios';
export const GET_CATALOG = 'GET_CATALOG';
export const INCREASE_PAGE = 'INCREASE_PAGE';
export const DECREASE_PAGE = 'DECREASE_PAGE';
export const SET_PAGE = 'SET_PAGE';

export function getCatalog() {
  return async function(dispatch) {
    const info = await axios.get("http://localhost:3001/products")
    dispatch({
      type: GET_CATALOG,
      payload: info.data,
    });
  };
};

export function increasePage() {
  return function(dispatch){
    dispatch({
      type: INCREASE_PAGE,
    });
  } 
};

export function decreasePage() {
  return function(dispatch){
    dispatch({
      type: DECREASE_PAGE,
    });
  }    
};

export function setPage(page) {
  return function(dispatch){
    dispatch({
      type: SET_PAGE,
      payload: page,
    });
  }    
};