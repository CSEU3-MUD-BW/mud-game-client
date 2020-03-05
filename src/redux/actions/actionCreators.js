import * as types from './actionTypes';
import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth'
import { store } from '../../index';

// export const testApiURL = 'https://lambda-mud-test.herokuapp.com'
export const apiURL = 'https://cseu3-mud.herokuapp.com/api';

export const logout = () => {
  return { type: types.LOGOUT, }
}

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
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.key });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: types.LOGIN_FAILURE });
    });
}


export const getRooms = userData => dispatch => {

  dispatch({ type: types.GET_ROOMS });

  return axiosWithAuth()
    .get(`${apiURL}/adv/rooms/`)
    .then(res => {
      const sortedRooms = res.data.sort((a, b) => a.id - b.id);
      dispatch({ type: types.GET_ROOMS_SUCCESS, payload: sortedRooms });
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: types.GET_ROOMS_FAILURE });
    });
}

export const initializeGame = userData => dispatch => {

  return axiosWithAuth()
    .get(`${apiURL}/adv/init/`)
    .then(res => {
      dispatch({ type: types.GET_PLAYER_INFO, payload: res.data });
    })
    .catch(err => {
      console.log(err);

    });
}

export const movePlayer = d => dispatch => {

  return axiosWithAuth()
    .post(`${apiURL}/adv/move/`, {
      direction: d
    })
    .then(res => {
      if (res.data.error_msg) {
        dispatch({
          type: types.MOVE_PLAYER_ERROR,
          payload: res.data.error_msg
        })
      } else {
        dispatch(movePlayerSuccess(res.data.nextRoomID))
      }
    })
    .catch(err => {
      console.log(err);

    });
}

export const movePlayerSuccess = (roomId) => async dispatch => {
  console.log(store.getState())

  let row = Math.ceil(roomId / 10) - 1;
  let col = roomId % 10 === 0 ? 9 : (roomId % 10) - 1;


  dispatch({
    type: types.MOVE_PLAYER,
    payload: [row, col],
    roomId
  });

};
