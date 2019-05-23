import { actionTypes } from '../actions/account';

const initialState = Object.assign(
  {
    needAuth: false,
    address: '', // LuongHV
    cipher: '',
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
  },
  (function() {
    let user = sessionStorage.getItem('user');
    const resp = {};
    return (
      (user = (user && JSON.parse(user)) || {}).address &&
        ((resp.address = user.address),
        (resp.flags = user.flags || {}),
        (resp.encryptedData = user.privateKey),
        resp.flags.isHardware && (resp.privateKey = 'HARDWARE')),
      resp
    );
  })()
);

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
