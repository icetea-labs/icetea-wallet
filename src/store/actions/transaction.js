import tweb3 from '../../service/tweb3'
/*
 * action types
 */
export const actionTypes = {
  SET_TRANSACTION_HISTORY: 'SET_TRANSACTION_HISTORY',
  SET_FETCH_TRANSACTION: 'SET_FETCH_TRANSACTION'
}
/*
 * action creators
 */
const getTransactionHistory = data => ({
  type: actionTypes.SET_TRANSACTION_HISTORY,
  data
})
const fetchTransactionHistory = data => ({
  type: actionTypes.SET_FETCH_TRANSACTION,
  data
})

// export const getTxHistory = data => ({
//   return (dispatch) => {
//     dispatch(getData())
//     getPeople()
//       .then((data) => {
//         dispatch(getDataSuccess(data))
//       })
//       .catch((err) => console.log('err:', err))
//   }
// });

export const getTxHistory = (data) => {
  // var op = {prove: false, page: 1, per_page: 20};
  // var myTxs1 = await tweb3.getPastEvents('Transferred', 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx', 'tx.height > 0', op);
  // console.log('getTxHistory:', myTxs1)
  // tweb3.getPastEvents('Transferred', 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx', 'tx.height > 0', op)
  // .then((events) => {
  //   console.log(events) // same results as the optional callback above
  // });

  return async (dispatch) => {
    var op = { prove: false, page: 1, per_page: 20 }
    var myTxs = await tweb3.getPastEvents('Transferred', 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx', 'tx.height > 0', op)
    console.log(myTxs.txs)
    dispatch(getTransactionHistory(myTxs.txs))
  }
}
