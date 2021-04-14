import { GET_PRODUCT_NAME } from "./actionsProductForms";

const initialState = {
  product: [],
};

const productFormsReducer = (state = initialState, action) => {
  switch (action.type) {
    /* case GET_PRODUCTS:
      return {
        ...state,
        product: [action.payload],
      }; */

      case GET_PRODUCT_NAME:
        if(!action.payload.info[0]) return {...state};
        return {
          ...state,
          product: [action.payload.info[0]]
        }

    default:
      return state;
  }
};

export default productFormsReducer;