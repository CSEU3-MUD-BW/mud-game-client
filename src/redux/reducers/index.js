import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import player from './playerReducer';


import roomsReducer from './roomsReducer';

const appReducer = combineReducers({
    player,
    // character,
    authentication,
    rooms: roomsReducer
});



export default appReducer