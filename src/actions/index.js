import * as types from '../constants/ActionTypes'

export const saveWallet = wallet => ({ type: types.SAVE_WALLET, wallet })
export const changeForm = formNo => ({ type: types.CHANGE_FORM, formNo })
export const changeULType = ulType => ({type: types.CHANGE_UL_TYPE, ulType})

// export const addTodo = text => ({ type: types.ADD_TODO, text })
