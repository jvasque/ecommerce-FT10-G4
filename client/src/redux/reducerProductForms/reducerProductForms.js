import { GET_PRODUCTS } from "./actionsProductForms";

const initialState = {
  product: [],
};

const productFormsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        product: [action.payload],
      };

    default:
      return state;
  }
};

export default productFormsReducer;