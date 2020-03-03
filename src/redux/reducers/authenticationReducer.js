import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  token: '',
  error: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case (types.SIGNUP_START):
      return { ...state, loading: true };
    case (types.LOGIN_START):
      return { ...state, loading: true };
    case (types.SIGNUP_SUCCESS):
      return { ...state, token: action.payload, loading: false };
    case (types.LOGIN_SUCCESS):
      return { ...state, token: action.payload, loading: false };
    case (types.SIGNUP_FAILURE):
      return { ...state, error:true, loading: false };
    case (types.LOGIN_FAILURE):
        return { ...state, error:true, loading: false };  
    default:
      return state;
  }
}

export default userReducer;