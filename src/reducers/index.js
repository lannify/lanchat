import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer
});