import { FETCH_REGISTRATION_REQUEST } from "../actions/registration";
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