import { put, call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { Fields } from "../../../screens/Authentication/Authentication.interface";
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

export const signInAccount = ({ email, password }: Fields): any => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const getIdToken = (): any => {
  return firebase.auth().currentUser?.getIdToken();
};

/**
 * getIdToken
 * @param {object} payload
 * @param {object} value contains email and password fields
 * @param {function} setStatus is function for handle of form status with api formik
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestAuthentication({
  payload: { values, setStatus },
}: RequestAuthenticationProps): Generator<StrictEffect, any, any> {
  try {
    yield call(signInAccount, values);

    const token: string = yield call(getIdToken);

    //* If the request is successfuled
    //* we set status on true
    setStatus(true);

    //* We set token for authentication
    yield put({
      type: FETCH_MESSAGES_SUCCESS,
      payload: {
        token: token,
      },
    });
  } catch (err) {
    console.error("Code ", err.code);
    console.error("Message ", err.message);
    //* If the request is rejected
    //* we set status on false
    setStatus(false);

    yield put({ type: FETCH_MESSAGES_FAILURE });
  }
}
