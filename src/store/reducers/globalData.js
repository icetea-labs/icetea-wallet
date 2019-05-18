import { actionTypes } from '../actions/globalData';

const initialState = {
  isLoading: false,
  showNotLoginNotify: false,
  triggerElement: null
};

const globalData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GLOBAL_LOADING:
      return Object.assign({}, state, {
        isLoading: action.data
      });
    // case types.SET_STEP:
    //   return {
    //     ...state,
    //     showNotLoginNotify: action.data
    //   }
    // case types.SET_SHOW_PRIVATEKEY:
    //   return {
    //     ...state,
    //     triggerElement: action.data
    //   }
    default:
      return state;
  }
};

export default globalData;
