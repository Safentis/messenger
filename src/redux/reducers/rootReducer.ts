import { combineReducers       } from 'redux';
import { authenticationReducer } from '../reducers/authenticationReducer/authenticationReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
    authenticationReducer,
});