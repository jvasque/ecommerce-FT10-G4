import { GET_WISHLISTS, ADD_TO_WISHLIST, CREATE_WISHLIST } from "./wishlistActions"

const initialState = {
  wishlists : [],
  changedWishlist : {},
}

const wishlistReducer = (state=initialState, action) => {

  switch(action.type) {
    case GET_WISHLISTS:
      return {
        ...state,
        wishlists: action.payload.wishlists
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        changedWishlist: action.payload
      };
    case CREATE_WISHLIST:
      return {
        ...state,
        changedWishlist: action.payload,
      };
    default:
      return {...state}
  }
}


export default wishlistReducer