import {
  GET_WISHLISTS,
  ADD_TO_WISHLIST,
  CREATE_WISHLIST,
  REMOVE_FROM_WISHLIST,
  DELETE_WISHLIST,
  GET_FAVS,
} from './wishlistActions';

const initialState = {
  wishlists: [],
  favorites: [],
  changedWishlist: {},
  changedProduct: {},
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLISTS:
      return {
        ...state,
        wishlists: action.payload.wishlists,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        changedWishlist: action.payload,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        changedWishlist: action.payload,
      };
    case CREATE_WISHLIST:
      return {
        ...state,
        changedWishlist: action.payload,
      };
    case DELETE_WISHLIST:
      return {
        ...state,
        changedWishlist: {},
      };
    case GET_FAVS:
      return {
        ...state,
        favorites: [...action.payload],
      };
    default:
      return { ...state };
  }
};

export default wishlistReducer;
