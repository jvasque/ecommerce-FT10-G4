import axios from 'axios';
export const POST_PRODUCTS = "POST_PRODUCTS";
export const DELETE_PRODUCTS = "DELETE_PRODUCTS";
export const PUT_PRODUCTS = "PUT_PRODUCTS";
export const GET_PRODUCTS = "GET_PRODUCTS";

export function postProduct(name, SKU, unitPrice, description, picture, category, unitsOnStock) {
    if (category.includes(",")) {
        var arr1 = category.split(",");
        var arrCategory = []
        for(var i = 0; i < arr1.length; i++){
            arrCategory.push(arr1[i].trim())
        }
        
      } else {
        var arrCategory = [category];
        
      }
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/products", {
            params: {
                name,
                SKU,
                unitPrice,
                description,
                picture,
                arrCategory,
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

export function putProduct(id, name, SKU, unitPrice, description, picture, category, unitsOnStock) {
    return async function (dispatch) {
        var json = await axios.put("http://localhost:3001/products/" + id, {
            params: {
                name,
                SKU,
                unitPrice,
                description,
                picture,
                category,
                unitsOnStock
            }
        });
        return dispatch({ type: PUT_PRODUCTS, payload: json.data })
    }
}

/* export function getProducts(id) {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/products/" + id);
        return dispatch({ type: GET_PRODUCTS, payload: json.data })
    }
} */