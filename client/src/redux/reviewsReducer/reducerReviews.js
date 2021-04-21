import { SUBMIT_COMMENTARY, GET_COMMENTARY, HAS_BUY, GET_PRODUCT_SCORE } from "./actionsReviews";

const initialState = {
  reviews: [],
  hasBuyOrderDetail: [],
  productScore: ''
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
      
      case GET_COMMENTARY:
        return {
          ...state,
          reviews: [action.payload.data]
        }

      case HAS_BUY:
        return {
          ...state,
          hasBuyOrderDetail: [action.payload.data]
        }

      case GET_PRODUCT_SCORE:
        return {
          ...state,
          productScore: [action.payload.data]
        }

    default:
      return state;
  }
};

export default reviewsReducer;