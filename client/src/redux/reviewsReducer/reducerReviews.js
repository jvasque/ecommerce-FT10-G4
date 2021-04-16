import { SUBMIT_COMMENTARY, GET_COMMENTARY } from "./actionsReviews";

const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
      
      case GET_COMMENTARY:
        return {
          ...state,
          reviews: [action.payload]
        }

    default:
      return state;
  }
};

export default reviewsReducer;