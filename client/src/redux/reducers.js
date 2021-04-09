import { combineReducers } from 'redux';
import detailReducer from './detailReducer/detailReducer';
//import productReducer from './productReducer/productReducer'
import searchReducer from './searchReducer/searchReducer'
import catalogReducer from './catalogReducer/catalogReducer'

const rootReducer = combineReducers({
    detailReducer,
    //productReducer,
    searchReducer,
    catalogReducer,
});

export default rootReducer;