import { put, takeEvery, all } from 'redux-saga/effects'
import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from '../actions/authentication';


function* requestAuthentication(field: any) {
  console.log(field);
  try {
    yield put({type: FETCH_MESSAGES_SUCCESS});
  } catch (err) {
    yield put({type: FETCH_MESSAGES_FAILURE});
  }
};

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
  ]);
};