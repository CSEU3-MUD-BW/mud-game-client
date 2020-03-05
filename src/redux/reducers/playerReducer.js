import * as type from "../actions/actionTypes";

const initialState = {
  position: [0, 0],
  roomId: 1,
  error:''
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    // case type.MOVE_PLAYER_UP:
    //   return { ...state, position: action.payload };
    // case type.MOVE_PLAYER_DOWN:
    //   return { ...state, position: action.payload };
    // case type.MOVE_PLAYER_RIGHT:
    //   return { ...state, position: action.payload };
    // case type.MOVE_PLAYER_LEFT:
    //   return { ...state, position: action.payload };
    case type.MOVE_PLAYER:
      return { ...state, position: action.payload, roomId: action.roomId,error:'Awesome move!' };
    case (type.MOVE_PLAYER_ERROR):
      return { ...state, error: action.payload }
    default:
      return state;
  }
};

export default playerReducer;
