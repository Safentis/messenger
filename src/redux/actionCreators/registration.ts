import { Fields } from "../../screens/Registration/RegistrationForm/RegistrationForm.interface";
import { FETCH_REGISTRATION_REQUEST } from "../actions/registration";

export const requestRegistration = (data: Fields) => {
  return {
    type: FETCH_REGISTRATION_REQUEST,
    payload: data,
  };
};
