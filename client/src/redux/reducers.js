import { combineReducers } from 'redux';
import detailReducer from './detailReducer/detailReducer';
//import productReducer from './productReducer/productReducer'
import searchReducer from './searchReducer/searchReducer'
import catalogReducer from './catalogReducer/catalogReducer'
import categoryFilterReducer from './categoryFilterReducer/categoryFilterReducer'

const rootReducer = combineReducers({
    detailReducer,
    //productReducer,
    searchReducer,
    catalogReducer,
    categoryFilterReducer,
});

export default rootReducer;