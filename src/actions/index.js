import * as types from '../constants/ActionTypes'

export const saveWallet = wallet => ({ type: types.SAVE_WALLET, wallet })
export const changeForm = formNo => ({ type: types.CHANGE_FORM, formNo })

// export const addTodo = text => ({ type: types.ADD_TODO, text })
