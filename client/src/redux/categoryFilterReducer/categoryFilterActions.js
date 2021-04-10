import axios from 'axios';
export const GET_CATEGORIES='GET_CATEGORIES';
export const FILTER_CATEGORY='FILTER_CATEGORY';
export const PRODUCT_CATEGORY='PRODUCT_CATEGORY';

export function getCategories() {
  return async function (dispatch) {
    const info = await axios.get('http://localhost:3001/allCategories');
    dispatch({
      type: GET_CATEGORIES,
      payload: info.data,
    });
  };
}

export function filterCategory(category) {
    return function (dispatch) {
      dispatch({
        type: FILTER_CATEGORY,
        payload: category,
      });
    };
}

export function getProductCategories(cat) {
  return async function (dispatch) {
    const info = await axios.get(`http://localhost:3001/products/categoria/${cat}`);
    dispatch({
      type: PRODUCT_CATEGORY,
      payload: info,
    });
  };
}