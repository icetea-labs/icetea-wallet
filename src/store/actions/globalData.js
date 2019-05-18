/*
 * action types
 */
export const actionTypes = {
  SET_GLOBAL_LOADING: 'SET_GLOBAL_LOADING'
};
/*
 * action creators
 */
export const setLoading = data => ({
  type: actionTypes.SET_GLOBAL_LOADING,
  data
});
