const initialState = {
  password: '',
  address: '',
  privateKey: '',
  keyStore: '',
  step: 'inputPassword',
  mnemonic: '',
  keyStoreText: '',
  showPrivateKey: false,
  confirmMnemonic: false,
};
const SET_STEP = 'createAccount/SET_STEP';
const SET_PASSWORD = 'createAccount/SET_PASSWORD';
const SET_ACCOUNT = 'createAccount/SET_ACCOUNT';
const SET_SHOW_PRIVATEKEY = 'createAccount/SET_SHOW_PRIVATEKEY';
const SET_CONFIRM_MNEMONIC = 'createAccount/SET_CONFIRM_MNEMONIC';
// const SET_SHOW_KEYSTORE_TEXT = 'createAccount/SET_SHOW_KEYSTORE_TEXT';

export const setStep = step => ({
  type: SET_STEP,
  step,
});
export const setPassword = password => ({
  type: SET_PASSWORD,
  password,
});
export const setAccount = data => ({
  type: SET_ACCOUNT,
  data,
});
export const setShowPrivateKey = data => ({
  type: SET_SHOW_PRIVATEKEY,
  data,
});
export const setConfirmMnemonic = data => ({
  type: SET_CONFIRM_MNEMONIC,
  data,
});

export default function create(state = initialState, action) {
  switch (action.type) {
    case SET_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case SET_STEP:
      return Object.assign({}, state, {
        step: action.step,
      });
    case SET_ACCOUNT:
      return Object.assign({}, state, action.data);
    case SET_SHOW_PRIVATEKEY:
      return Object.assign({}, state, {
        showPrivateKey: action.data,
      });
    case SET_CONFIRM_MNEMONIC:
      return Object.assign({}, state, {
        confirmMnemonic: action.data,
      });
    default:
      return state;
  }
}
