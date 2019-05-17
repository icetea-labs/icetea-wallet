import { actionTypes } from './../actions/transaction'

const initialState = {
  transactionHistory: [],
  isFetching: false,
  errMsg: ''
}

function transaction(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TX_HISTORY_FETCHING:
      return Object.assign({}, state, { isFetching: true })
    case actionTypes.TX_HISTORY_SUCCESS:
      return Object.assign({}, state, { 
        transactionHistory: action.data, 
        isFetching: false
      })
    case actionTypes.TX_HISTORY_FAILURE:
      return Object.assign({}, state, { 
        isFetching: false,
        errMsg: action.data
      })
    default:
      return state
  }
}

export default transaction
