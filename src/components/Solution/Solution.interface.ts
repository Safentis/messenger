import { Chatrooms } from "../../screens/Root.interface";

export interface Props {
  className?: string;
  sendMessage: Function;
  question: string | undefined;
}
