import {combineReducers} from 'redux'
import detailReducer from './details/detail'



export default combineReducers({
  details: detailReducer,
  
})
