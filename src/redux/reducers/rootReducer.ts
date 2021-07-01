import { combineReducers       } from 'redux';
import { authenticationReducer } from '../reducers/authenticationReducer/authenticationReducer';
import { menudialogsReducer    } from './menudialogsReducer/menudialogsReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
    authenticationReducer,
    menudialogsReducer,
});