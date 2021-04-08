import { GETDETAIL } from "../actions/getDetail"

const initialState = {
  productDetail: {},
  loading: false
}

 const detailReducer = (state=initialState, action) => {

  switch(action.type) {
    case GETDETAIL:
      return {
        ...state,
        productDetail: action.payload,
        loading: true
      };
    default:
      return {...state}
  }
}


export default detailReducer