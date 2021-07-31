import { Message } from "../../Root.interface";

export interface Props {
  dialogs: any[];
  user: any;
  settings: any;
}

export interface Signal {
  channel: string;
  message: number;
  publisher: string;
  subscription: null | string;
  timetoken: string | number | Date;
}

export interface Envelope {
  message: Message;
  publisher: string;
  timetoken: string | number | Date;
}
