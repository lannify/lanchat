import { AsyncStorage } from 'react-native';
import firebase from 'firebase';


import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL
} from './types';

export const fetchUser = (userUid) => async (dispatch) => {
  let uid = userUid;
  let user = null;
  try {
     await firebase.database().ref(`users/${uid}`).once('value', function(snap){
       user = snap.val();
     });

     dispatch({ type: FETCH_USER_SUCCESS, payload: user });
  } catch (err) {
      console.log(err)
  }
};