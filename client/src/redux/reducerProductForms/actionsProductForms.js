import axios from 'axios';
export const POST_PRODUCTS = "POST_PRODUCTS";
export const DELETE_PRODUCTS = "DELETE_PRODUCTS";
export const PUT_PRODUCTS = "PUT_PRODUCTS";
export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";
export const CLEAR_PRODUCT_FORM = "CLEAR_PRODUCT_FORM";

export function postProduct(name, SKU, unitPrice, description, picture, categoryCheck, unitsOnStock) {
    
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/products", {
            params: {
                name,
                SKU,
                unitPrice,
                description,
                picture,
                categoryCheck,
                unitsOnStock
            }
        });
        return dispatch({ type: POST_PRODUCTS, payload: json.data })
    }
}

export function deleteProduct(id) {
    return async function (dispatch) {
        var json = await axios.delete("http://localhost:3001/products/" + id, { data: id });
        return dispatch({ type: DELETE_PRODUCTS, payload: json.data })
    }
}

export function putProduct(id, name, SKU, unitPrice, description, picture, unitsOnStock, categoriesIds) {
    return async function (dispatch) {
        var json = await axios.put("http://localhost:3001/products/" + id, {
            params: {
                name,
                SKU,
                unitPrice,
                description,
                picture,
                unitsOnStock,
                categoriesIds
            }
        });
        return dispatch({ type: PUT_PRODUCTS, payload: json.data })
    }
}

export function getProductName(find) {
    return async function (dispatch) {
      const info = await axios.get('http://localhost:3001/search?term=' + find);
      let query = {
        info: info.data,
        find,
      }
      dispatch({
        type: GET_PRODUCT_NAME,
        payload: query,
      });
    };
}

export function clearProduct () {
    return function(dispatch) {
        dispatch({
            type: CLEAR_PRODUCT_FORM
        })
    }
}