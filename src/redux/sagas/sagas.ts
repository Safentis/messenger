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

const getIdToken = (): any => {
  return (
    firebase
      .auth()
      .currentUser
      ?.getIdToken()
  );
};

function* requestAuthentication({payload: {values, setStatus}}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    const user : any    = yield call(signInAccount, values);
    const token: string = yield call(getIdToken);
    
    //* If the request is successfuled
    //* we set status on true
    setStatus(true);

    //* We set token for authentication
    yield put({
      type: FETCH_MESSAGES_SUCCESS, 
      payload: {
        token: token
      },
    });
  } catch(err) {
    //* If the request is rejected
    //* we set status on false
    setStatus(false);
    
    yield put({type: FETCH_MESSAGES_FAILURE});
  } finally {
    console.log('loading end');
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
  ]);
}