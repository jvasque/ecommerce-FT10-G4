import { combineReducers } from 'redux';
import reducerProductForms from './reducerProductForms/reducerProductForms';
import reducerSearch from './reducerSearch/reducerSearch';

const rootReducer = combineReducers({
    reducerProductForms,
    reducerSearch
});

export default rootReducer;