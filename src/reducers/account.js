import * as types from '../constants/ActionTypes'

const initialState = {
  mnemonic: '',
  password: '',
  privateKey: '',
  address: '',
  fromAdd: 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx',
  toAdd: '',
  amount: '',
  memo: ''
};

const account = ( state = initialState, action ) => {
  switch (action.type) {
    case types.SET_ACCOUNT_1:
      return Object.assign({}, state, action.data);
    case types.SET_USER_INFO:
      return Object.assign({}, state, action.data);
    case types.SET_NEEDAUTH:
      return Object.assign({}, state, action.data);
    case types.SET_WALLETCONNECT_URI:
      return Object.assign({}, state, action.data);
    default: return state;
  }
}

export default account;