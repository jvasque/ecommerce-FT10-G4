import axios from 'axios';
export const GET_WISHLISTS='GET_WISHLISTS';
export const ADD_TO_WISHLIST='ADD_TO_WISHLIST';
export const CREATE_WISHLIST='CREATE_WISHLIST';
export const REMOVE_FROM_WISHLIST='REMOVE_FROM_WISHLIST';

// users/wishlist?id=
export function getWishlists(id) {
  return function(dispatch) {
    return axios(`http://localhost:3001/users/wishlist?id=${id}`)
    .then(json => {
      dispatch({ type: GET_WISHLISTS, payload: json.data})        
    })
  };
};

export function addToWishlist( wishlistId, productId ) {
  return function(dispatch) {
    return axios.put(`http://localhost:3001/users/wishlist/${wishlistId}/${productId}?action=add`)
    .then(json => {
      dispatch({ type: ADD_TO_WISHLIST, payload: json.data})        
    })
  };
};
export function removeFromWishlist( wishlistId, productId ) {
  return function(dispatch) {
    return axios.put(`http://localhost:3001/users/wishlist/${wishlistId}/${productId}?action=remove`)
    .then(json => {
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: json.data.products})        
    })
  };
};
export function createWishlist( userId ,name ) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/users/wishlist/post/${userId}?name=${name}`)
    .then(json => {
      dispatch({ type: CREATE_WISHLIST, payload: json.data})        
    })
  };
};