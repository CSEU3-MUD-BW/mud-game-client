import * as type from "../actions/actionTypes";

const initialState = {
  position: [0, 0],
  roomId: 1,
  error: '',
  numberOfPlayers: 0
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.MOVE_PLAYER:
      return { ...state, position: action.payload, roomId: action.roomId, error: 'Awesome move!' };
    case (type.MOVE_PLAYER_ERROR):
      return { ...state, error: action.payload }
    case (type.SAVE_NUMBER_OF_PLAYERS):
      return { ...state, numberOfPlayers: action.payload }
    default:
      return state;
  }
};

export default playerReducer;
