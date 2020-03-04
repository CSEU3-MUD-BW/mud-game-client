import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import character from './characterReducer';

import roomsReducer from './roomsReducer';

const appReducer = combineReducers({
    character,
    authentication,

    rooms: roomsReducer
});

// const rootReducer = (state, action) => {
//     return appReducer (state, action);
// };

export default appReducer