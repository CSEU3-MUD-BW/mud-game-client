import * as types from './actionTypes';
import axios from 'axios';


export const apiURL = ' https://lambda-mud-test.herokuapp.com/api';



export const signup = userData => dispatch => {
    dispatch({ type: types.SIGNUP_START });
    console.log('im thereeeeeeeees')
    axios
    .post(`${apiURL}/registration/`, userData)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data.key });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.SIGNUP_FAILURE });
      });
  };

  
export const login = userData => dispatch => {
    dispatch({ type: types.LOGIN_START })
    return axios
    .post(`${apiURL}/login/`, userData)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.key});
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.LOGIN_FAILURE });
      });
  }


  // Map action creators
  export const getRooms = () => dispatch => {
    dispatch({ type: types.GET_ROOMS });

    axios.get(`https://cseu3-mud.herokuapp.com/api/adv/rooms/adv/rooms`)
      .then(res => {
        const sortedRooms = res.data.sort((a, b) => a.id - b.id);
        dispatch({ type: types.GET_ROOMS_SUCCESS, payload: sortedRooms });
      })
      .catch(err => {
        console.log(err)
        dispatch({ type: types.GET_ROOMS_FAILURE });
      });
  } 