import { takeEvery, all    } from 'redux-saga/effects';

import requestAuthentication from './authenticationSagas/requestAuthentication';
import requestSignOut        from './authenticationSagas/requestSignOut';
import requestTokenCheck     from './authenticationSagas/requestTokenCheck';
import requestDialogs        from './dialogsSagas/requestDialogs';
import requestFiltered       from './dialogsSagas/requestFiltered';
import requestActions        from './dialogsSagas/requestActions';

import { 
  FETCH_EXITING_APP, 
  FETCH_MESSAGES_REQUEST, 
  FETCH_TOKEN_CHECK 
} from '../actions/authentication';

import { 
  FETCH_ACTIONS,
  FETCH_DIALOGS, 
  FETCH_FILTERED_DIALOGS 
} from '../actions/dialogs';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
    takeEvery(FETCH_DIALOGS, requestDialogs),
    takeEvery(FETCH_FILTERED_DIALOGS, requestFiltered),
    takeEvery(FETCH_ACTIONS, requestActions)
  ]);
}