import { actionTypes } from './../actions/account'

const initialState = {
  needAuth: false,
  address: 'teat1afx4v0qzjz8zsjar5d3hsehg9l6zhks6jxmdg2',//teat1afx4v0qzjz8zsjar5d3hsehg9l6zhks6jxmdg2
  cipher: '',
  privateKey: '5JbTYGjgbc1RuqXGMKLzp7BEehzPjojrc3hX6KN8rfWW',
  keyStore: '',
  mnemonic: '',
  encryptedData: '',
  flags: {
    isHardware: false,
    isLedger: false,
    isCoinomi: false,
    isCoinomiEmulate: false,
    isInfinito: false,
    isInfinitoEmulate: false,
    isWalletConnect: false
  },
  wcUri: '',
  userInfo: {}
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      return Object.assign({}, state, action.data)
    case actionTypes.SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.data
      })
    case actionTypes.SET_WALLETCONNECT_URI:
      return Object.assign({}, state, {
        wcUri: action.data
      })
    case actionTypes.SET_NEEDAUTH:
      if (state.flags.isHardware) action.data = false
      return Object.assign({}, state, {
        needAuth: action.data
      })
    default: return state
  }
}

export default account
