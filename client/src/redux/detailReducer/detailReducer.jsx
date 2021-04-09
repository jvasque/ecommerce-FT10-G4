import { GET_DETAIL } from "../detailReducer/detailActions"

const initialState = {
  productDetail: {},
  loading: false
}

 const detailReducer = (state=initialState, action) => {

  switch(action.type) {
    case GET_DETAIL:
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