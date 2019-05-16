/*
 * action types
 */
export const actionTypes = {
  SET_ACCOUNT: 'account/SET_ACCOUNT',
  SET_USER_INFO: 'account/SET_USER_INFO',
  SET_NEEDAUTH: 'account/SET_NEEDAUTH',
  SET_WALLETCONNECT_URI: 'account/SET_WALLETCONNECT_URI'
}
/*
 * action creators
 */
export const setAccount = data => ({
  type: actionTypes.SET_ACCOUNT,
  data
})
export const setUserInfo = data => ({
  type: actionTypes.SET_USER_INFO,
  data
})
export const setNeedAuth = data => ({
  type: actionTypes.SET_NEEDAUTH,
  data
})
export const setWalletConUri = data => ({
  type: actionTypes.SET_WALLETCONNECT_URI,
  data
})
