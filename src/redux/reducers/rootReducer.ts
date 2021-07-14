import { combineReducers       } from 'redux';
import { authenticationReducer } from '../reducers/authenticationReducer/authenticationReducer';
import { dialogsReducer        } from '../reducers/dialogsReducer/dialogsReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
    authenticationReducer,
    dialogsReducer,
});