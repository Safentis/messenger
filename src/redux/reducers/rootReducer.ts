import { combineReducers } from 'redux';

import { authenticationReducer } from './authenticationReducer/authenticationReducer';
import { dialogsReducer } from './dialogsReducer/dialogsReducer';
import { userReducer } from './userReducer/userReducer';

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
  authenticationReducer,
  dialogsReducer,
  userReducer,
});
