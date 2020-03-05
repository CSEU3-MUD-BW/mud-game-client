import * as types from '../actions/actionTypes';

const initialState = {
  rooms: [],
  error: false,
  numberOfPlayers:1
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    
    case (types.SAVE_ROOMS):
      let sortedRooms = [...action.payload];
      sortedRooms.sort(function(a, b) {
        return a.id - b.id;
      })
      return { ...state, rooms:sortedRooms };

    case (types.SAVE_NUMBER_OF_PLAYERS):
      return {...state,numberOfPlayers: action.payload}  

    default:
      return state;
  }
}

export default roomReducer;