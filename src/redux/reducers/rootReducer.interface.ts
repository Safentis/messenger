import { State as AuthenticationState } from "./authenticationReducer/authenticationReducer.interface";
import { State as DialogsState } from "./dialogsReducer/dialogsReducer.interface";
import { State as UserState } from "./userReducer/userReducer.interface";

export interface RootReducerState {
  authenticationReducer: AuthenticationState;
  dialogsReducer: DialogsState;
  userReducer: UserState;
}
