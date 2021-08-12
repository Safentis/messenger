import { takeEvery, all } from 'redux-saga/effects';

import requestAuthentication from './enter/authentication/requestAuthentication';
import requestGoogle from './enter/registration/requestGoogle';
import requestSignOut from './enter/authentication/requestSignOut';
import requestTokenCheck from './enter/authentication/requestTokenCheck';
import requestDialogs from './dialogs/requestDialogs';
import requestFiltered from './dialogs/requestFiltered';
import requestRestorePassword from './enter/restore/requestRestorePassword';
import requestActions from './dialogs/requestActions';
import requestMessages from './dialogs/requestMessages';
import requestUser from './user/requestUser';
import requestUpdate from './user/requestUpdate';
import requestSettings from './user/requestSettings';
import requestRegistration from './enter/registration/requestRegistration';
import requestUpdatePassword from './enter/update/requestUpdatePassword';

import {
  FETCH_EXITING_APP,
  FETCH_MESSAGES_REQUEST,
  FETCH_TOKEN_CHECK,
} from '../actions/authentication';
import { FETCH_REGISTRATION_GOOGLE, FETCH_REGISTRATION_REQUEST } from '../actions/registration';
import {
  FETCH_ACTIONS,
  FETCH_DIALOGS,
  FETCH_MESSAGES,
  FETCH_FILTERED_DIALOGS,
} from '../actions/dialogs';
import { FETCH_USER, FETCH_USER_UPDATE, FETCH_USER_SETTINGS } from '../actions/user';
import { FETCH_RESTORE_PASSWORD } from '../actions/restore';
import { FETCH_UPDATE_PASSWORD } from '../actions/update';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST as any, requestAuthentication),
    takeEvery(FETCH_REGISTRATION_REQUEST as any, requestRegistration),
    takeEvery(FETCH_RESTORE_PASSWORD as any, requestRestorePassword),
    takeEvery(FETCH_REGISTRATION_GOOGLE, requestGoogle),
    takeEvery(FETCH_UPDATE_PASSWORD as any, requestUpdatePassword),
    takeEvery(FETCH_TOKEN_CHECK as any, requestTokenCheck),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
    takeEvery(FETCH_DIALOGS as any, requestDialogs),
    takeEvery(FETCH_FILTERED_DIALOGS as any, requestFiltered),
    takeEvery(FETCH_ACTIONS as any, requestActions),
    takeEvery(FETCH_USER as any, requestUser),
    takeEvery(FETCH_USER_UPDATE as any, requestUpdate),
    takeEvery(FETCH_USER_SETTINGS as any, requestSettings),
    takeEvery(FETCH_MESSAGES as any, requestMessages),
  ]);
}
