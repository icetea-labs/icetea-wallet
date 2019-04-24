import * as types from '../constants/ActionTypes'

export const saveWallet = wallet => ({ type: types.SAVE_WALLET, wallet })
export const setStep = step => ({ type: types.SET_STEP, step })
export const changeULType = ulType => ({type: types.CHANGE_UL_TYPE, ulType})
export const changePopup = puNo => ({ type: types.CHANGE_PU, puNo })


// export const addTodo = text => ({ type: types.ADD_TODO, text })
