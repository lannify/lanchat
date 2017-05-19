import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';
import contactReducer from './contact_reducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  contacts: contactReducer
});