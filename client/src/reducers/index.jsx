import {combineReducers} from '@reduxjs/toolkit'
import detailsReducer from './details/detailsSlice'



export default combineReducers({
  details: detailsReducer,
  
})
