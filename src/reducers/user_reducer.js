import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL
} from '../actions/types';

const initialState = {  
  user: null, 
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { user: action.payload };
    case FETCH_USER_FAIL:
      return { user: null, error: action.payload };
    case UPDATE_USER_SUCCESS:
      return { user: action.payload, error: '' };
    case UPDATE_USER_FAIL:
      return { error: action.payload };
    default: 
      return state;
  }
};