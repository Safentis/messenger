import { Chatroom } from "../../../Root.interface";
import { UserStore } from '../../../../redux/reducers/userReducer/userReducer.interface';

export interface Props {
  dialogs: any;
  user: UserStore;
}

export type chatroomType = [string, Chatroom]