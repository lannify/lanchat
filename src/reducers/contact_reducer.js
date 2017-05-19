import {
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAIL
} from '../actions/types';

const initialState = {
  contactList: null,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONTACT_SUCCESS:
      return { error: '' };
    case CREATE_CONTACT_FAIL:
      return { error: action.payload };
    case FETCH_CONTACTS_SUCCESS:
      return { contactList: action.payload, error: '' };
    default: 
      return state;
  }
};