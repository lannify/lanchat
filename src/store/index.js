import {
  createStore,
  applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const store = createStore(reducers, {}, applyMiddleware(logger, reduxThunk));

export default store;