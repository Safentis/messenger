import { combineReducers       } from 'redux';
import { authenticationReducer } from '../reducers/authenticationReducer/authenticationReducer';
import { loaderReducer         } from './loaderReducer/loaderReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
    authenticationReducer,
    loaderReducer
});