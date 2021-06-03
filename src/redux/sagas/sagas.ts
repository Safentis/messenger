import firebase from 'firebase';
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

function* requestAuthentication({type, payload: field}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    const req: any = yield call(signInAccount, field);
    console.log(req);
    yield put({type: FETCH_MESSAGES_SUCCESS});
  } catch (err) {
    console.log(err);
    yield put({type: FETCH_MESSAGES_FAILURE});
  }
};

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
  ]);
};