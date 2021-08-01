import { State, Action } from "./dialogsReducer.interface";
import { Chatroom } from "../../../screens/Root.interface";
import { FETCH_DIALOGS_SET, FETCH_FILTERED_SET } from "../../actions/dialogs";

const initialState: State = {
  dialogs: [],
  filtered: [],
};

export const dialogsReducer = (
  state = initialState,
  { type, payload }: Action
): State => {
  const dialogs: Chatroom[] = payload?.dialogs;
  const filtered: Chatroom[] = payload?.filtered;

  switch (type) {
    case FETCH_DIALOGS_SET:
      return {
        ...state,
        dialogs,
      };
    case FETCH_FILTERED_SET:
      return {
        ...state,
        filtered,
      };
    default:
      return state;
  }
};
