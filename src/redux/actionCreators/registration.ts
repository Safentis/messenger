import { FETCH_REGISTRATION_GOOGLE, FETCH_REGISTRATION_REQUEST } from "../actions/registration";
import { EnterSagaProps } from "../sagas/sagas.interface";
import { ActionCreator } from "./actionCreators.interface";

export const requestRegistration = (data: EnterSagaProps): ActionCreator<EnterSagaProps> => {
  return {
    type: FETCH_REGISTRATION_REQUEST,
    payload: data,
  };
};

export const requestGoogle = (): ActionCreator<{}> => {
  return {
    type: FETCH_REGISTRATION_GOOGLE,
    payload: {
      
    }
  }
}