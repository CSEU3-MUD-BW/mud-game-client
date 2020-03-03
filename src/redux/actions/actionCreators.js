import * as types from './actionTypes';
import axios from 'axios';


export const apiURL = ' https://lambda-mud-test.herokuapp.com/api/';



export const signup = userData => dispatch => {
    dispatch({ type: types.SIGNUP_START });
    console.log('im thereeeeeeeees')
    axios
    .post(`${apiURL}registration/`, userData)
      .then(res => {
        dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data.key });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.SIGNUP_FAILURE });
      });
  };

// export const signUp = (userData) => {

//     return (dispatch) => {

//         dispatch({ type: types.SIGNUP_START });
//         axios
//         .post(`${apiURL}registration/`, userData)
//           .then(res => {
//             dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data.key });
//           })
//           .catch(err => {
//             console.log(err);
//             dispatch({ type: types.SIGNUP_FAILURE });
//           });
//       };

//     }


  
export const login = userData => dispatch => {
    dispatch({ type: types.LOGIN_START })
    return axios
    .post(`${apiURL}login/`, userData)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.key});
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.LOGIN_FAILURE });
      });
  }