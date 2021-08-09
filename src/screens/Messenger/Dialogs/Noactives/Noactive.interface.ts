import { UserStore } from "../../../../redux/reducers/userReducer/userReducer.interface";
import { Chatrooms } from "../../../Root.interface";

export interface Props {
  dialogs: Chatrooms;
  user: UserStore;
}
