import { POST_PROMOTIONS, DELETE_PROMOTIONS, PUT_PROMOTIONS, CLEAR_PROMOTION_FORM, GET_PROMOTIONS } from "./actionsPromotionsForm";

const initialState = {
  promotions: [],
};

const promotionsFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROMOTIONS:
      if(!action.payload) return {...state};
      return {
        ...state,
        promotions: [action.payload],
        }

    default:
      return initialState;
  }
};

export default promotionsFormReducer;