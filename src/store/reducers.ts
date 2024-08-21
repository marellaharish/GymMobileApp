import { combineReducers } from 'redux';
import userReducer from './userReducer.ts'; // Adjust the path as needed 

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
