import { txApi } from '../../api';

/*
 * action types
 */
export const actionTypes = {
  TX_HISTORY_FETCHING: 'TX_HISTORY_FETCHING',
  TX_HISTORY_SUCCESS: 'TX_HISTORY_SUCCESS',
  TX_HISTORY_FAILURE: 'TX_HISTORY_FAILURE'
};
/*
 * action creators
 */
const getData = () => ({
  type: actionTypes.TX_HISTORY_FETCHING
});
const getDataSuccess = data => ({
  type: actionTypes.TX_HISTORY_SUCCESS,
  data
});
const getDataFailure = data => ({
  type: actionTypes.TX_HISTORY_FAILURE,
  data
});

export const getTxHistory = (address, conditions, options) => {
  return dispatch => {
    // dispatch(getData())
    txApi
      .getTxHistory(address, conditions, options)
      .then(data => {
        // console.log(data.txs)
        dispatch(getDataSuccess(data));
      })
      .catch(err => {
        console.log('err:', err);
        dispatch(getDataFailure(err));
      });
  };
};
