import { txApi } from '../../api'

/*
 * action types
 */
export const actionTypes = {
  TX_HISTORY_FETCHING: 'TX_HISTORY_FETCHING',
  TX_HISTORY_SUCCESS: 'TX_HISTORY_SUCCESS',
  TX_HISTORY_FAILURE: 'TX_HISTORY_FAILURE'
}
/*
 * action creators
 */
const getData = () => ({
  type: actionTypes.TX_HISTORY_FETCHING,
})
const getDataSuccess = data => ({
  type: actionTypes.TX_HISTORY_SUCCESS,
  data
})
const getDataFailure = data => ({
  type: actionTypes.TX_HISTORY_FAILURE,
  data
})

export const getTxHistory = (options) => {
  return (dispatch) => {
    var op = { prove: false, page: 1, per_page: 20 }
    dispatch(getData())
    txApi.getTxHistory(op)
      .then((data) => {
        // console.log(data.txs)
        dispatch(getDataSuccess(data.txs))
      })
      .catch((err) => {
        console.log('err:', err)
        dispatch(getDataFailure(err))
      })
  }
}
