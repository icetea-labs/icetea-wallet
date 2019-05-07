import * as types from '../constants/ActionTypes'

const initialState = {
  password: "",
  address: "",
  privateKey: "",
  keyStore: "",
  step: "inputPassword",
  mnemonic: "",
  keyStoreText: "",
  showPrivateKey: false,
  confirmMnemonic: false
};

const create = ( state = initialState, action ) => {
  switch (action.type) {
    case types.SET_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    case types.SET_STEP:
      return Object.assign({}, state, {
        step: action.step
      });
    case types.SET_ACCOUNT:
      return Object.assign({}, state, action.data);
    case types.SET_SHOW_PRIVATEKEY:
      return Object.assign({}, state, {
        showPrivateKey: action.data
      });
    case types.SET_CONFIRM_MNEMONIC:
      return Object.assign({}, state, {
        confirmMnemonic: action.data
      });
    default: 
      return state;
  }
}

export default create;