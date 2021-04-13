import { combineReducers } from "redux";
import reducerProductForms from "./reducerProductForms/reducerProductForms";
import detailReducer from "./detailReducer/detailReducer";
import searchReducer from "./searchReducer/searchReducer";
import catalogReducer from "./catalogReducer/catalogReducer";
import categoryFilterReducer from "./categoryFilterReducer/categoryFilterReducer";
import cartReducer from "./cartReducer/cartReducer";

const rootReducer = combineReducers({
  detailReducer,
  searchReducer,
  catalogReducer,
  categoryFilterReducer,
  reducerProductForms,
  cartReducer,
});

export default rootReducer;
