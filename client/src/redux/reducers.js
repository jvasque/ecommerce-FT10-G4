import { combineReducers } from 'redux';
import reducerProductForms from './reducerProductForms/reducerProductForms';
import detailReducer from './detailReducer/detailReducer';
import searchReducer from './searchReducer/searchReducer';
import catalogReducer from './catalogReducer/catalogReducer';
import categoryFilterReducer from './categoryFilterReducer/categoryFilterReducer';
import iconReducer from './iconReducer/iconReducer';
import cartReducer from './cartReducer/cartReducer';
import reviewsReducer from './reviewsReducer/reducerReviews';
import wishlistReducer from './wishlistReducer/wishlistReducer';
import loginReducer from './loginReducer/loginReducer'
import postUserReducer from './postUserReducer/postUserReducer'
import AdminReducer from './AdminReducer/AdminReducer'
import paymentIdReducer from './formPaymentReducer/formPaymentReducer'

const rootReducer = combineReducers({  
  detailReducer,
  searchReducer,
  catalogReducer,
  categoryFilterReducer,
  reducerProductForms,
  iconReducer,
  cartReducer,
  reviewsReducer,
  wishlistReducer,
  loginReducer,
  postUserReducer,
  AdminReducer,
  paymentIdReducer,
});

export default rootReducer;
