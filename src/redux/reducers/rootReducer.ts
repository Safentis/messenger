import { combineReducers       } from 'redux';
import { authenticationReducer } from '../reducers/authenticationReducer/authenticationReducer';
import { loaderReducer         } from './loaderReducer/loaderReducer';
import { dialogsReducer        } from './dialogsReducer/dialogsReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
    authenticationReducer,
    loaderReducer,
    dialogsReducer,
});