import {combineReducers} from 'redux'
import detailReducer from './details/detail'
import reducerSearch from './searchReducer/reducerSearch'



export default combineReducers({
  details: detailReducer,
  search: reducerSearch,
})
