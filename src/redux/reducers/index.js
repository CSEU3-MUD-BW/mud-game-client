import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import player from './playerReducer';
import roomReducer from './roomReducer';


const appReducer = combineReducers({
    player,
    authentication,
    room:roomReducer
});

// const rootReducer = (state, action) => {
//     return appReducer (state, action);
// };

export default appReducer