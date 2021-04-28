import {
  GET_CATALOG,
  INCREASE_PAGE,
  DECREASE_PAGE,
  SET_PAGE,
  SET_DOLLAR,
} from './catalogActions';

const initialState = {
  products: [],
  page: 1,
  dollar: 140,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATALOG: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case INCREASE_PAGE: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case DECREASE_PAGE: {
      return {
        ...state,
        page: state.page - 1,
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case SET_DOLLAR: {
      return {
        ...state,
        dollar: action.payload,
      };
    }
    default:
      return state;
  }
};
