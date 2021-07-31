import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_TOKEN_CHECK,
  FETCH_EXITING_APP,
} from "../actions/authentication";

export const requestAuthentication = (data: any) => {
  return {
    type: FETCH_MESSAGES_REQUEST,
    payload: data,
  };
};

export const requestAuthenticationSuccess = () => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
  };
};

export const requestAuthenticationFailure = () => {
  return {
    type: FETCH_MESSAGES_FAILURE,
  };
};

export const requestTokenCheck = (token: string) => {
  return {
    type: FETCH_TOKEN_CHECK,
    payload: {
      token,
    },
  };
};

export const requestExitingApp = () => {
  return {
    type: FETCH_EXITING_APP,
  };
};
