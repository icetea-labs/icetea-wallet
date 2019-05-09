import * as types from '../constants/ActionTypes'

export const saveWallet = wallet => ({ type: types.SAVE_WALLET, wallet })
export const changeULType = ulType => ({type: types.CHANGE_UL_TYPE, ulType})
export const changePopup = puNo => ({ type: types.CHANGE_PU, puNo })
// Start for createAccount
export const setStep            = step =>     ({ type: types.SET_STEP, step: step });
export const setPassword        = password => ({ type: types.SET_PASSWORD, password: password });
export const setAccount         = data =>     ({ type: types.SET_ACCOUNT, data: data });
export const setShowPrivateKey  = data =>     ({ type: types.SET_SHOW_PRIVATEKEY, data: data });
export const setConfirmMnemonic = data =>     ({ type: types.SET_CONFIRM_MNEMONIC, data: data });
// golobal
export const setLoading         = data =>     ({ type: types.SET_GLOBAL_LOADING , data: data });

// Save account
export const setAccount1        = data => ({ type: types.SET_ACCOUNT_1, data: data});
export const setUserInfo        = data => ({ type: types.SET_USER_INFO, data: data});
export const setNeedAuth        = data => ({ type: types.SET_NEEDAUTH, data: data});
export const setWalletConUri    = data => ({ type: types.SET_WALLETCONNECT_URI, data: data});