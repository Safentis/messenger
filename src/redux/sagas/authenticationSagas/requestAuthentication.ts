import { put, call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { Fields } from "../../../screens/Authentication/Authentication.interface";
import { handleError } from "../../../utils/functions";
import { AUTH_SUCCESS_MESSAGE } from "../../../utils/consts";
import {
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../../actions/authentication";

export interface RequestAuthenticationProps {
  payload: {
    values: Fields;
    setStatus: Function;
  };
}

export const signInAccount = ({ email, password }: Fields): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const getIdToken = (): Promise<string> | undefined => {
  return firebase.auth().currentUser?.getIdToken();
};

/**
 * getIdToken
 * @param {object} payload
 * @param {Fields} payload.values contains email and password fields
 * @param {function} payload.setStatus is function for handle of form status with api formik
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestAuthentication({
  payload: { values, setStatus },
}: RequestAuthenticationProps): Generator<StrictEffect, void, any> {
  try {
    yield call(signInAccount, values);

    const token: string = yield call(getIdToken);

    //* If the request is successfuled
    //* we set status on true
    setStatus({state: true, message: AUTH_SUCCESS_MESSAGE});

    //* We set token for authentication
    yield put({
      type: FETCH_MESSAGES_SUCCESS,
      payload: {
        token: token,
      },
    });
  } catch (error) {
    setStatus({state: false, message: error.message});
    //* If the request is rejected
    //* we set status on false
    yield put({ type: FETCH_MESSAGES_FAILURE });
    handleError(error);
  }
}
