import { combineReducers } from 'redux';
import reducerProductForms from './reducerProductForms/reducerProductForms';
import reducerSearch from './reducerSearch/reducerSearch';
import detailReducer from './detailReducer/detailReducer';
import searchReducer from './searchReducer/searchReducer'
import catalogReducer from './catalogReducer/catalogReducer'
import categoryFilterReducer from './categoryFilterReducer/categoryFilterReducer'
 
const rootReducer = combineReducers({
    detailReducer,
    searchReducer,
    catalogReducer,
    categoryFilterReducer,
    reducerProductForms,
    reducerSearch,
});

export default rootReducer;