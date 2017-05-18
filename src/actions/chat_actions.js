import firebase from 'firebase';
import moment from 'moment';

import {
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL
} from './types';

export const createChat = (chat) => async (dispatch) => {
  console.log(chat);
};