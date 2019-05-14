export const SET_STEP = 'createAccount/SET_STEP';
export const SET_PASSWORD = 'createAccount/SET_PASSWORD';
export const SET_ACCOUNT = 'createAccount/SET_ACCOUNT';
export const SET_SHOW_PRIVATEKEY = 'createAccount/SET_SHOW_PRIVATEKEY';
export const SET_CONFIRM_MNEMONIC = 'createAccount/SET_CONFIRM_MNEMONIC';
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