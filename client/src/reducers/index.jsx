import {combineReducers} from 'redux'
import detailReducer from './details/detail'
import reducerSearch from './reducerSearch/reducerSearch'




export default combineReducers({
  details: detailReducer,
  reducerSearch: reducerSearch,
  
})
