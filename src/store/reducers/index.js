import { combineReducers } from 'redux'
import create from './create'
import transaction from './transaction'
import account from './account'
import globalData from './globalData'

const myReducer = combineReducers({
  create,
  account,
  transaction,
  globalData
})

export default myReducer
