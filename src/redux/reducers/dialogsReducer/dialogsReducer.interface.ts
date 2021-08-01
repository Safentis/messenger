import { Chatroom } from "../../../screens/Root.interface";

export interface State {
  dialogs: Chatroom[];
  filtered: Chatroom[];
}

export interface Action {
  type: string;
  payload: {
    dialogs: Chatroom[]
    filtered: Chatroom[]
  };
}
