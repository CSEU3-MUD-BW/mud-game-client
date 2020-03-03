import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import character from './characterReducer';

const appReducer = combineReducers({
    character,
    authentication
});

// const rootReducer = (state, action) => {
//     return appReducer (state, action);
// };

export default appReducer