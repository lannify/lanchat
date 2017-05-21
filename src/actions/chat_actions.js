import firebase from 'firebase';
import moment from 'moment';
import uuidHelper from 'uuid';

import {
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL
} from './types';

export const createChat = (newText, contactUid) => async (dispatch) => {

  const { uid } = firebase.auth().currentUser;

  let text = newText,
      receiverUid = contactUid,
      isNewChat = false;

  try {
    let response = await firebase.database().ref(`users/${uid}/chatrooms/${receiverUid}`)
                            .once('value', snap => {
                              if (!snap.val()) { isNewChat = true; }
                            });
    if (isNewChat) {
      let chatRoomUid = uuidHelper.v4(),
          messageId = uuidHelper.v1();

      let userInfo = { name: '', avatarUrl: '' };

      let user = await firebase.database().ref(`users/${uid}`).once('value', snap => {
        let result = snap.val();
        userInfo.name = result.displayName;
        userInfo.avatarUrl = result.avatarUrl ? result.avatarUrl : 'N/A';
      });

      let chatroom = await firebase.database().ref(`chatrooms/${chatRoomUid}`)
                              .set({
                                users: [ uid, receiverUid ],
                                messages: [
                                  {
                                    id: messageId,
                                    text: text,
                                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                                    author: {
                                      name: userInfo.name,
                                      avatarUrl: userInfo.avatarUrl
                                    }
                                  }
                                ]
                              });
      
      // setting receiverUid as key to find from current User's chatrooms
      await firebase.database().ref(`users/${uid}/chatrooms/${receiverUid}`)
                .set({ chatRoomUid });
      await firebase.database().ref(`users/${receiverUid}/chatrooms/${uid}`)
                .set({ chatRoomUid });
    } else {
      console.log('THERE IS CHAT HISTORY. APPEND NEW CHAT TO CHATROOM MESSAGE')
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchChatHistory = (contactUid) => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;

  let chatRoomUid,
      chatHistory;

  try {
    await firebase.database().ref(`users/${uid}/chatrooms/${contactUid}`)
                  .once('value', snap => {
                    chatRoomUid = snap.val().chatRoomUid;
                  });

    await firebase.database().ref(`chatrooms/${chatRoomUid}`)
                  .once('value', snap => {
                    console.log(snap.val());
                    chatHistory = snap.val();
                  })
  } catch (err) {
    console.log(err)
  }

}; 