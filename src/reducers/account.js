import * as types from '../constants/ActionTypes'

const initialState = {
  mnemonic: '',
  password: '',
  privateKey: '',
  address: '',
  fromAdd: 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx',
  toAdd: '',
  amount: '',
  memo: '',
  needAuth: false,
  address: "",
  cipher: "",
  privateKey: "",
  keyStore: "",
  mnemonic: "",
  encryptedData: "",
  flags: {
      isHardware: false,
      isLedger: false,
      isCoinomi: false,
      isCoinomiEmulate: false,
      isInfinito: false,
      isInfinitoEmulate: false,
      isWalletConnect: false
  },
  wcUri: "",
  userInfo: {}
};

const account = ( state = initialState, action ) => {
  switch (action.type) {
    case types.SET_ACCOUNT_1:
      return Object.assign({}, state, action.data);
    case types.SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.data
    });
    case types.SET_WALLETCONNECT_URI:
      return Object.assign({}, state, {
          wcUri: action.data
      });
    case types.SET_NEEDAUTH:
      return state.flags.isHardware && (action.data = false),
      Object.assign({}, state, {
        needAuth: action.data
      });
    default: return state;
  }
}

export default account;