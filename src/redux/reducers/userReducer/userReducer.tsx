import { State, Action } from "./userReducer.interface";
import { FETCH_USER_SET, FETCH_USER_SETTINGS_SET } from "../../actions/user";

const initialState: State = {
  user: {},
  settings: {
    greeting: "Hello man!",
    greetings: ["Olla"],
  },
};

export const userReducer = (
  state = initialState,
  { type, payload }: Action
): State => {
  const user: any = payload?.user;
  const settings: any = payload?.settings;

  switch (type) {
    case FETCH_USER_SET:
      return {
        ...state,
        user,
      };
    case FETCH_USER_SETTINGS_SET:
      return {
        ...state,
        settings,
      };
    default:
      return state;
  }
};
