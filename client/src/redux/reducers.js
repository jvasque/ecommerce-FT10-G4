import { combineReducers } from "redux";
import reducerProductForms from "./reducerProductForms/reducerProductForms";
import detailReducer from "./detailReducer/detailReducer";
import searchReducer from "./searchReducer/searchReducer";
import catalogReducer from "./catalogReducer/catalogReducer";
import categoryFilterReducer from "./categoryFilterReducer/categoryFilterReducer";
import cardReducer from "./cardReducer/cardReducer";

const rootReducer = combineReducers({
  detailReducer,
  searchReducer,
  catalogReducer,
  categoryFilterReducer,
  reducerProductForms,
  cardReducer,
});

export default rootReducer;
