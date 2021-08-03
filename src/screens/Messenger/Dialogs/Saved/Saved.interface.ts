import { Chatroom } from "../../../Root.interface";
import { User } from '../../../../redux/reducers/userReducer/userReducer.interface';

export interface Props {
  dialogs: any;
  user: User;
}

export type chatroomType = [string, Chatroom]