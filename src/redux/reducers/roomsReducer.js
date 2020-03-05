import * as types from '../actions/actionTypes';

const initialRoomsArray = [];

function roomsReducer(state = initialRoomsArray, action) {
  switch (action.type) {
    case types.GET_ROOMS_SUCCESS:
      return [...action.payload];
    case types.GET_ROOMS_FAILURE:
      return []
    default:
      return state;
  }
}

export default roomsReducer;