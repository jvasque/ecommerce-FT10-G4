import { SUBMIT_COMMENTARY } from "./actionsProductForms";

const initialState = {
  product: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
      
      case SUBMIT_COMMENTARY:
        return {
          ...state,
          product: []
        }

    default:
      return state;
  }
};

export default productFormsReducer;