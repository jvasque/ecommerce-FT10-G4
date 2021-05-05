import { GET_PRODUCT_NAME, CLEAR_PRODUCT_FORM } from "./actionsProductForms";

const initialState = {
  product: [],
};

const productFormsReducer = (state = initialState, action) => {
  switch (action.type) {

      case GET_PRODUCT_NAME:
        if(!action.payload.info[0]) return {...state};
        return {
          ...state,
          product: [action.payload.info[0]]
        }
      
      case CLEAR_PRODUCT_FORM:
        return {
          ...state,
          product: []
        }

    default:
      return state;
  }
};

export default productFormsReducer;