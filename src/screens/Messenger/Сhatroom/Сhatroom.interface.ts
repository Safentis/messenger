import { Chatroom, Chatrooms, DateType, Message } from '../../Root.interface';

export interface Props {
  dialogs: Chatrooms;
  user: any;
  settings: any;
}

export interface Signal {
  channel: string;
  message: number;
  publisher: string;
  subscription: null | string;
  timetoken: DateType;
}

export interface Envelope {
  message: Message;
  publisher: string;
  timetoken: DateType;
}

export interface ChatroomState {
  messages: Message[];
  keys: string[];
  question: string | undefined;
  status: string;
  complited: DateType;
}

export type chatroomType = [string, Chatroom];
export type typingType = [boolean, Function];
export type messagesType = [Message[], Function];
export type pictureType = [object[], Function];
export type inputbarType = [string, Function];
export type useparamsType = {
  key: any;
};
