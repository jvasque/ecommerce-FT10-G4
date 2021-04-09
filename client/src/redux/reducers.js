import { combineReducers } from 'redux';
import detailReducer from './detailReducer/detailReducer';
//import productReducer from './productReducer/productReducer'
import searchReducer from './searchReducer/searchReducer'

const rootReducer = combineReducers({
    detailReducer,
    //productReducer,
    searchReducer,
});

export default rootReducer;