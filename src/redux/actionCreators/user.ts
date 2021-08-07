import { RequestUpdateProps } from "../sagas/user/requestUpdate";
import { RequestSettings } from "../sagas/user/requestSettings";
import { ActionCreator } from "../actionCreators/actionCreators.interface";
import { RequestUser } from "../sagas/user/requestUser";
import {
  FETCH_USER,
  FETCH_USER_SETTINGS,
  FETCH_USER_UPDATE,
} from "../actions/user";

export const requestUser = ({ user }: RequestUser): ActionCreator<RequestUser> => {
  return {
    type: FETCH_USER,
    payload: {
      user
    },
  };
};

export const requestUpdate = ({ user, closeModal }: RequestUpdateProps): ActionCreator<RequestUpdateProps> => {
  return {
    type: FETCH_USER_UPDATE,
    payload: {
      user,
      closeModal,
    },
  };
};

export const requestSettings = ({ settings, closeModal }: RequestSettings): ActionCreator<RequestSettings> => {
  return {
    type: FETCH_USER_SETTINGS,
    payload: {
      settings,
      closeModal,
    },
  };
};
