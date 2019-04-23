// import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes'

const initialState = {
  Name: 'LuongHV'
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_WALLET:
      state.wallet = action.wallet
      return state
    case types.CHANGE_FORM:
      state = {
        ...state,
        formNo: action.formNo
      }
      return state
    case types.CHANGE_UL_TYPE:
      state = { ...state, ulType: action.ulType }
    case types.CHANGE_PU:
      state = {...state,
        puNo: action.puNo
      }
      return state
    default: return state;
  }
}

export default myReducer;