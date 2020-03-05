import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import player from './playerReducer';
import roomReducer from './roomReducer';


import roomsReducer from './roomsReducer';

const appReducer = combineReducers({
    player,
    room:roomReducer,
    // character,
    authentication,
    rooms: roomsReducer
});

// const rootReducer = (state, action) => {
//     return appReducer (state, action);
// };

export default appReducer