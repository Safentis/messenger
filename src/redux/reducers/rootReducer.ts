import { combineReducers } from "redux";
import { authenticationReducer } from "../reducers/authenticationReducer/authenticationReducer";
import { dialogsReducer } from "../reducers/dialogsReducer/dialogsReducer";
import { userReducer } from "../reducers/userReducer/userReducer";

//* It'a root reducer for another reducers
export const rootReducer = combineReducers({
  authenticationReducer,
  dialogsReducer,
  userReducer,
});
