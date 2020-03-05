import * as types from './actionTypes';
import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../constant'
import { store } from '../../index';
export const apiURL = 'https://cseu3-mud.herokuapp.com/api/';

export const logout = () => {
  return { type: types.LOGOUT, }
}


export const signup = userData => dispatch => {
  dispatch({ type: types.SIGNUP_START });
  console.log('im thereeeeeeeees')
  axios
    .post(`${apiURL}registration/`, userData)
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
    .post(`${apiURL}login/`, userData)
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

  return axiosWithAuth()
    .get(`${apiURL}adv/rooms/`)
    .then(res => {
      dispatch({ type: types.SAVE_ROOMS, payload: res.data });
    })
    .catch(err => {
      console.log(err);

    });
}

export const initializeGame = userData => dispatch => {

  return axiosWithAuth()
    .get(`${apiURL}adv/init/`)
    .then(res => {
      dispatch({ type: types.SAVE_NUMBER_OF_PLAYERS, payload: res.data.players.length });
    })
    .catch(err => {
      console.log(err);

    });
}

export const movePlayerUp = userData => dispatch => {

  return axiosWithAuth()
    .post(`${apiURL}adv/move/`, {
      direction: 'n'
    })
    .then(res => {
      if (res.data.error_msg) {
        dispatch({
          type:types.MOVE_PLAYER_ERROR,
          payload:res.data.error_msg
        } )
      } else {
        dispatch(movePlayerUpSuccess())
      }
    })
    .catch(err => {
      console.log(err);

    });
}


export const movePlayerDown = userData => dispatch => {

  return axiosWithAuth()
    .post(`${apiURL}adv/move/`, {
      direction: 's'
    })
    .then(res => {
      if (res.data.error_msg) {
        dispatch({
          type:types.MOVE_PLAYER_ERROR,
          payload:res.data.error_msg
        } )
      } else {
        dispatch(movePlayerDownSuccess())
      }
    })
    .catch(err => {
      console.log(err);

    });
}

export const movePlayerRight = userData => dispatch => {

  return axiosWithAuth()
    .post(`${apiURL}adv/move/`, {
      direction: 'e'
    })
    .then(res => {
      if (res.data.error_msg) {
        dispatch({
          type:types.MOVE_PLAYER_ERROR,
          payload:res.data.error_msg
        } )
      } else {
        dispatch(movePlayerRightSuccess())
      }
    })
    .catch(err => {
      console.log(err);

    });
}

export const movePlayerLeft = userData => dispatch => {

  return axiosWithAuth()
    .post(`${apiURL}adv/move/`, {
      direction: 'w'
    })
    .then(res => {
      if (res.data.error_msg) {
        dispatch({
          type:types.MOVE_PLAYER_ERROR,
          payload:res.data.error_msg
        } )
      } else {
        dispatch(movePlayerLeftSuccess())
      }
    })
    .catch(err => {
      console.log(err);

    });
}


export const movePlayerUpSuccess = () => async dispatch => {
  console.log(store.getState())
  const currentPosition = await store.getState().player.position;


  if (currentPosition[1] !== 0) {
    dispatch({
      type: types.MOVE_PLAYER_UP,
      payload: [currentPosition[0], currentPosition[1] - SPRITE_SIZE]
    });
  }
};

export const movePlayerDownSuccess = () => async dispatch => {
  const currentPosition = await store.getState().player.position;

  if (currentPosition[1] !== MAP_HEIGHT - SPRITE_SIZE) {
    dispatch({
      type: types.MOVE_PLAYER_DOWN,
      payload: [currentPosition[0], currentPosition[1] + SPRITE_SIZE]
    });
  }
};

export const movePlayerRightSuccess = () => async dispatch => {
  const currentPosition = await store.getState().player.position;

  if (currentPosition[0] !== MAP_WIDTH - SPRITE_SIZE) {
    dispatch({
      type: types.MOVE_PLAYER_RIGHT,
      payload: [currentPosition[0] + SPRITE_SIZE, currentPosition[1]]
    });
  }
};

export const movePlayerLeftSuccess = () => async dispatch => {
  const currentPosition = await store.getState().player.position;

  if (currentPosition[0] !== 0) {
    dispatch({
      type: types.MOVE_PLAYER_LEFT,
      payload: [currentPosition[0] - SPRITE_SIZE, currentPosition[1]]
    });
  }
};
