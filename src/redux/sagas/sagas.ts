import firebase from 'firebase'; // FIREBASE
import { put, takeEvery, all, call, StrictEffect } from 'redux-saga/effects'
import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from '../actions/authentication';

const signInAccount = ({email, password}: any): any => {
  return (
    firebase
    .auth()
    .signInWithEmailAndPassword(
      email, 
      password
    )
  );
};

function* requestAuthentication({payload: {values, setStatus}}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    const req: any = yield call(signInAccount, values);
    setStatus(true);
    yield put({type: FETCH_MESSAGES_SUCCESS});
  } catch (err) {
    setStatus(false);
    yield put({type: FETCH_MESSAGES_FAILURE});
  }
};

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
  ]);
};