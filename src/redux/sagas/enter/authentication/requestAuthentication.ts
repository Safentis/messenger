import { put, call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { Fields } from "../../../../screens/enter/Authentication/Authentication.interface";
import { handleError } from "../../../../utils/functions";
import { AUTH_SUCCESS_MESSAGE } from "../../../../utils/consts";
import {
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../../../actions/authentication";
import { EnterSagaProps } from "../../sagas.interface";

export const signInAccount = ({ email, password }: Fields): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const getIdToken = (): Promise<string> | undefined => {
  return firebase.auth().currentUser?.getIdToken();
};

/**
 * @param {EnterSagaProps} payload
 * @param {Fields} payload.values
 * @param {object} payload.formik
 * @param {object} payload.histroy
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestAuthentication({
  payload: { values, formik, history },
}: EnterSagaProps): Generator<StrictEffect, void, any> {
  try {
    yield call(signInAccount, values);

    const token: string = yield call(getIdToken);

    //* If the request is successfuled
    //* we set status on true
    formik.setStatus({state: true, message: AUTH_SUCCESS_MESSAGE});

    //* We set token for authentication
    yield put({
      type: FETCH_MESSAGES_SUCCESS,
      payload: {
        token: token,
      },
    });
  } catch (error) {
    formik.setStatus({state: false, message: error.message});
    //* If the request is rejected
    //* we set status on false
    yield put({ type: FETCH_MESSAGES_FAILURE });
    handleError(error);
  }
}
