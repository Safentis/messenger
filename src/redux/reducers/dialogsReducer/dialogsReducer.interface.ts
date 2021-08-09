import { Chatrooms } from "../../../screens/Root.interface";

export interface State {
  dialogs: Chatrooms;
  filtered: Chatrooms;
}

export interface Action {
  type: string;
  payload: {
    dialogs: Chatrooms
    filtered: Chatrooms
  };
}
