import { ActionCreator } from "./actionCreators.interface";
import { EnterSagaProps } from "../sagas/sagas.interface";
import { FETCH_UPDATE_PASSWORD } from "../actions/update";

export const requestUpdatePassword = (data: EnterSagaProps): ActionCreator<EnterSagaProps> => {
  return {
    type: FETCH_UPDATE_PASSWORD,
    payload: data,
  };
};
