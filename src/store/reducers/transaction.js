import { actionTypes } from './../actions/create';

const initialState = {
  transactionHistory: {},
  fetchTransaction: false,
};

 function transaction(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TRANSACTION_HISTORY:
      return Object.assign({}, state, { transactionHistory: action.data });
    case actionTypes.SET_FETCH_TRANSACTION:
      return Object.assign({}, state, { transactionHistory: action.data });
    default:
      return state;
  }
}

export default transaction;
