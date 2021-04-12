import { GET_CATEGORIES, FILTER_CATEGORY } from "./categoryFilterActions";

const initialState = {
  categories: [],
  categoryFiltered: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case FILTER_CATEGORY: {
        return {
          ...state,
          categoryFiltered: action.payload,
        };
    }
  default:
    return state;
  }
};
