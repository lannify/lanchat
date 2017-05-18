import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL
} from './types';

export const logInUser = (email, password) => async (dispatch) => {
    let userEmail = email.toLowerCase().trim();
    try {
        let response = await firebase.auth().signInWithEmailAndPassword(userEmail, password);

        const { email, displayName, photoUrl, uid } = response;
        let user = { email, displayName, photoUrl };

        dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
        let errorMessage = 'Invalid account credentials';

        dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    } 
};   
    
export const logOut = () => dispatch => {
  dispatch({ type: LOGOUT }); 
};


export const createUser = (email, password, displayName) => async (dispatch) => {
    let userEmail = email.toLowerCase().trim();
    let name = displayName;

    try {
        let authUser = await firebase.auth().createUserWithEmailAndPassword(userEmail, password);

        let user = await firebase.database().ref(`users/${authUser.uid}`).set({
            email: authUser.email,
            displayName: name
        });

        const { email, displayName, photoUrl, uid } = user;
        let userDetail = { email, displayName, photoUrl };

        dispatch({ type: CREATE_USER_SUCCESS, payload: userDetail });
    } catch (error) {
        let errorMessage = 'Cannot create new account. Please try again.';

        dispatch({ type: CREATE_USER_FAIL, payload: errorMessage });
    } 
};