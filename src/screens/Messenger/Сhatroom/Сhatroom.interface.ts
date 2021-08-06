import { Chatroom, Message } from "../../Root.interface";

export interface Props {
  dialogs: Chatroom[];
  user: any;
  settings: any;
}

export interface Signal {
  channel: string;
  message: number;
  publisher: string;
  subscription: null | string;
  timetoken: dateType;
}

export interface Envelope {
  message: Message;
  publisher: string;
  timetoken: dateType;
}

export interface ChatroomState {
  messages: Message[];
  question: string;
  status: string;
  complited: dateType;
}

export type dateType = string | number | Date;
export type chatroomType = [string, Chatroom];
export type activityType = dateType;
export type typingType = [boolean, Function];
export type messagesType = [Message[], Function];
export type pictureType = [object[], Function];
export type inputbarType = [string, Function];
export type useparamsType = {
  key: any;
};