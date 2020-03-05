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
    case (type.GET_PLAYER_INFO):
      return {
        ...state,
        numberOfPlayers: action.payload.players.length,
        roomId: action.payload.currentRoomID
      }
    default:
      return state;
  }
};

export default playerReducer;
