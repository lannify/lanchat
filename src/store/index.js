import {
  createStore,
  applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

export default store;