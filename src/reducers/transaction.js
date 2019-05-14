const initialState = {
  transactionHistory: {},
  fetchTransaction: false,
};
const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY';
const SET_FETCH_TRANSACTION = 'SET_FETCH_TRANSACTION';

export const getTransactionHistory = data => ({
  type: SET_TRANSACTION_HISTORY,
  data,
});
export const fetchTransactionHistory = data => ({
  type: SET_FETCH_TRANSACTION,
  data,
});

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_HISTORY:
      return Object.assign({}, state, { transactionHistory: action.data });
    case SET_FETCH_TRANSACTION:
      return Object.assign({}, state, { transactionHistory: action.data });
    default:
      return state;
  }
}
