import { FetchActions } from '../sagas/dialogs/requestActions';
import {
  FETCH_ACTIONS,
  FETCH_DIALOGS,
  FETCH_FILTERED_DIALOGS,
  FETCH_MESSAGES,
} from '../actions/dialogs';
import { Chatrooms } from '../../screens/Root.interface';
import { ActionCreator } from './actionCreators.interface';
import { FetchMessages } from '../sagas/dialogs/requestMessages';

export const requestDialogs = (dialogs: Chatrooms): ActionCreator<{ dialogs: Chatrooms }> => {
  return {
    type: FETCH_DIALOGS,
    payload: {
      dialogs,
    },
  };
};

export const setFilteredDialogs = (dialogs: Chatrooms): ActionCreator<{ dialogs: Chatrooms }> => {
  return {
    type: FETCH_FILTERED_DIALOGS,
    payload: {
      dialogs,
    },
  };
};

export const requestActions = ({ chatId, body }: FetchActions): ActionCreator<FetchActions> => {
  return {
    type: FETCH_ACTIONS,
    payload: {
      chatId,
      body,
    },
  };
};

export const requestMessages = ({ chatId, body }: FetchMessages): ActionCreator<FetchMessages> => {
  return {
    type: FETCH_MESSAGES,
    payload: {
      chatId,
      body,
    },
  };
};
