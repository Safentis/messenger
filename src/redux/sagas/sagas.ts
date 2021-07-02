import { takeEvery, all                            } from 'redux-saga/effects'
import { FETCH_MESSAGES_REQUEST, FETCH_TOKEN_CHECK } from '../actions/authentication';
import requestAuthentication                         from './authenticationSagas/requestAuthentication';
import requestTokenCheck                             from './authenticationSagas/requestTokenCheck';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
  ]);
}