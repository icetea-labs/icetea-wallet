/*
 * action types
 */
export const actionTypes = {
  SET_TRANSACTION_HISTORY : 'SET_TRANSACTION_HISTORY',
  SET_FETCH_TRANSACTION : 'SET_FETCH_TRANSACTION',
}
/*
 * action creators
 */
export const getTransactionHistory = data => ({
  type: actionTypes.SET_TRANSACTION_HISTORY,
  data,
});
export const fetchTransactionHistory = data => ({
  type: actionTypes.SET_FETCH_TRANSACTION,
  data,
});