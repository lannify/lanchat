import {
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL
} from '../actions/types';

const initialState = {
  chat: null,
  isNewChat: true,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CHAT_SUCCESS':
      return { error: '', isNewChat: false };
    case 'CREATE_CHAT_FAIL':
      return { error: action.payload };
    default: 
      return state;
  }
};