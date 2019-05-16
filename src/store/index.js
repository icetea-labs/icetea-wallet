import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,
  composeWithDevTools(
    compose(
      applyMiddleware(thunk)
    )
  )
);

export default store;
