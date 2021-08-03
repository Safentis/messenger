import { FETCH_REGISTRATION_GOOGLE, FETCH_REGISTRATION_REQUEST } from "../actions/registration";
import { RequestRegistration } from "../sagas/registrationSagas/requestRegistration";
import { ActionCreator } from "./actionCreators.interface";

export const requestRegistration = ({values, setStatus}: RequestRegistration): ActionCreator<RequestRegistration> => {
  return {
    type: FETCH_REGISTRATION_REQUEST,
    payload: {
      values,
      setStatus,
    },
  };
};

export const requestGoogle = (): ActionCreator<{}> => {
  return {
    type: FETCH_REGISTRATION_GOOGLE,
    payload: {
      
    }
  }
}