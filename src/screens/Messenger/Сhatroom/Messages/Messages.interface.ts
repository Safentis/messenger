import { Message } from "../../../Root.interface";

export interface Props {
  className?: string;
  messages: Message[];
}

export type MessagesElement = HTMLElement | null;
export type ScrollHeight = number | null;
