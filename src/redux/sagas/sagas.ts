import { takeEvery, all                            } from 'redux-saga/effects'
import { FETCH_MESSAGES_REQUEST, FETCH_TOKEN_CHECK } from '../actions/authentication';
import { FETCH_ACTIVE_DIALOG, FETCH_ALL_DIALOGS, FETCH_COMPLITE_DIALOG, FETCH_DELETE_DIALOG, FETCH_FILTER_DIALOGS } from '../actions/dialogs';
import { FETCH_SAVE_DIALOGS                        } from '../actions/dialogs';
import requestAuthentication                         from './requestAuthentication';
import requestTokenCheck                             from './requestTokenCheck';
import requestAllDialogs                             from './requestAllDialogs';
import requestFilterDialogs                          from './requestFilterDialogs';
import requestSaveDialogs                            from './requestSaveDialogs';
import requestActiveDialog                           from './requestActiveDialog';
import requestDeleteDialog                           from './requestDeleteDialog';
import requestCompliteDialog                         from './requestCompliteDialog';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
    takeEvery(FETCH_ALL_DIALOGS, requestAllDialogs),
    takeEvery(FETCH_FILTER_DIALOGS, requestFilterDialogs),
    takeEvery(FETCH_SAVE_DIALOGS, requestSaveDialogs),
    takeEvery(FETCH_ACTIVE_DIALOG, requestActiveDialog),
    takeEvery(FETCH_DELETE_DIALOG, requestDeleteDialog),
    takeEvery(FETCH_COMPLITE_DIALOG, requestCompliteDialog)
  ]);
}