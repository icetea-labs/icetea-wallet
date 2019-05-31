import { actionTypes } from '../actions/account';

const initialState = Object.assign(
  {
    needAuth: false,
    address: '',
    cipher: '',
    privateKey: '',
    keyStore: '',
    mnemonic: '',
    encryptedData: '',
    indexKey: 0,
    childKey: [],
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
  (function getSessionStorage() {
    const resp = {};
    let user = sessionStorage.getItem('user');

    if (user && JSON.parse(user).address) {
      user = JSON.parse(user);
      resp.address = user.address;
      resp.flags = user.flags || {};
      resp.encryptedData = user.mnemonic;
      // resp.mnemonic = user.mnemonic;
      resp.indexKey = user.indexKey;
      resp.childKey = user.childKey;
    }
    return resp;
  })()
);

const addChildKey = (state, action) => {
  const childKey = {
    index: action.data.indexKey,
    address: action.data.address,
    privateKey: action.data.privateKey || '',
    balance: action.data.balance || 0,
    selected: action.data.selected || false,
  };
  let isNewAddress = true;
  state.childKey.forEach(element => {
    if (element === childKey.address) {
      isNewAddress = false;
    }
  });

  if (isNewAddress) {
    state.childKey.push(childKey);
    let current = sessionStorage.getItem('user');
    if (!current) {
      current = {};
    } else {
      current = JSON.parse(current);
      current.childKey.push({ address: childKey.address, index: childKey.index, selected: false });
      current.indexKey = action.data.indexKey;
      sessionStorage.setItem('user', JSON.stringify(current));
    }
  }
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      // addChildKey(state, action);
      return Object.assign({}, state, action.data);

    case actionTypes.ADD_NEW_ACCOUNT:
      addChildKey(state, action);
      return Object.assign({}, state, { indexKey: action.data.indexKey });

    case actionTypes.IMPORT_NEW_ACCOUNT:
      return addChildKey(state, action);

    case actionTypes.SET_BALANCE_CHILDKEY:
      return Object.assign({}, state, {
        childKey: action.data,
      });

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
