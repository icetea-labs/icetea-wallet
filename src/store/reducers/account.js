import { actionTypes } from '../actions/account';

const initialState = {
  needAuth: false,
  address: 'teat07vs2vr2dmsh56wkwfh5dmeg9tl2u6np9scyazv', // LuongHV
  cipher: 'Tinduong11@',
  privateKey: '',
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
    isWalletConnect: false,
  },
  wcUri: '',
  userInfo: {},
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      return Object.assign({}, state, action.data);
    case actionTypes.SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.data,
      });
    case actionTypes.SET_WALLETCONNECT_URI:
      return Object.assign({}, state, {
        wcUri: action.data,
      });
    case actionTypes.SET_NEEDAUTH:
      if (state.flags.isHardware) action.data = false;
      return Object.assign({}, state, {
        needAuth: action.data,
      });
    default:
      return state;
  }
};

export default account;
