import { ActionCreator } from "./actionCreators.interface";
import { RequestRestore } from "../sagas/restoreSagas/restoreRequest";
import { FETCH_RESTORE_PASSWORD } from "../actions/restore";

export const requestRestore = (data: any): ActionCreator<RequestRestore> => {
  return {
    type: FETCH_RESTORE_PASSWORD,
    payload: {
      data
    },
  };
};
