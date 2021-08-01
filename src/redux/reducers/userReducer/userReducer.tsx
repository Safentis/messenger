import { State, Action, User, Settings } from "./userReducer.interface";
import { FETCH_USER_SET, FETCH_USER_SETTINGS_SET } from "../../actions/user";

const initialState: State = {
  user: {
    email: "",
    name: "",
    photo: "",
    uid: "",
  },
  settings: {
    greeting: "",
    greetings: [""],
  },
};

export const userReducer = (state = initialState, { type, payload }: Action): State => {
  const user: User = payload?.user;
  const settings: Settings = payload?.settings;

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
