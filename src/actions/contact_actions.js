import firebase from 'firebase';

import {
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAIL
} from './types';

export const createContact = (contactEmail, contactName)  => async (dispatch) => {

  let email = contactEmail.trim();
  let name = contactName;

  const userUid = firebase.auth().currentUser.uid;

  let contactAccount;

  try {
    await firebase.database().ref('users')
            .orderByChild('email')
            .equalTo(email)
            .once('value', snap => { contactAccount = snap.val(); });
    if (contactAccount) {
      let contactUid = Object.keys(contactAccount)[0];

      await firebase.database().ref(`users/${userUid}/contacts/${contactUid}`)
                               .set({ name });
      dispatch({ type: CREATE_CONTACT_SUCCESS });
    }                          
  } catch (err) {
      console.log(err)
      dispatch({ type: CREATE_CONTACT_FAIL });
  }
}; 

export const fetchContacts = () => async (dispatch) => {
  const { uid } = firebase.auth().currentUser;

  let contacts = [];

  try {
    let response = await firebase.database().ref(`users/${uid}/contacts`)
      .once('value', snap => { 
        let tmp = snap.val(); 
        Object.keys(tmp).forEach((key) => {
          contacts.push({ name: tmp[key].name, uid: key });
        });    
      });

    if (response) {
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: contacts });
    }
  } catch (err) {
      console.log(err)
      dispatch({ type: FETCH_CONTACTS_FAIL });
  }
};