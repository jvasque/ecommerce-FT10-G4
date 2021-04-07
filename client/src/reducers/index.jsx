import { GETDETAIL } from "../actions/GetDetails";

const initialState = {
  productDetail: {},
  loadingDetail: false
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case GETDETAIL:
      return {
        ...state,
        productDetail: action.payload,
        loadingDetail: true
      };
    default:
      return state; 
  }
};

export default rootReducer;
