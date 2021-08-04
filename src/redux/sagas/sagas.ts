import { takeEvery, all } from "redux-saga/effects";

import requestAuthentication from "./authenticationSagas/requestAuthentication";
import requestGoogle from "./registrationSagas/requestGoogle";
import requestRestore from "./restoreSagas/restoreRequest";
import requestSignOut from "./authenticationSagas/requestSignOut";
import requestTokenCheck from "./authenticationSagas/requestTokenCheck";
import requestDialogs from "./dialogsSagas/requestDialogs";
import requestFiltered from "./dialogsSagas/requestFiltered";
import requestActions from "./dialogsSagas/requestActions";
import requestMessages from "./dialogsSagas/requestMessages";
import requestUser from "./userSaga/requestUser";
import requestUpdate from "./userSaga/requestUpdate";
import requestSettings from "./userSaga/requestSettings";
import requestRegistration from "./registrationSagas/requestRegistration";

import {
  FETCH_EXITING_APP,
  FETCH_MESSAGES_REQUEST,
  FETCH_TOKEN_CHECK,
} from "../actions/authentication";
import {
  FETCH_REGISTRATION_GOOGLE,
  FETCH_REGISTRATION_REQUEST,
} from "../actions/registration";
import {
  FETCH_ACTIONS,
  FETCH_DIALOGS,
  FETCH_MESSAGES,
  FETCH_FILTERED_DIALOGS,
} from "../actions/dialogs";
import {
  FETCH_USER,
  FETCH_USER_UPDATE,
  FETCH_USER_SETTINGS,
} from "../actions/user";
import { 
  FETCH_RESTORE_PASSWORD 
} from "../actions/restore";

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST as any, requestAuthentication),
    takeEvery(FETCH_REGISTRATION_REQUEST as any, requestRegistration),
    takeEvery(FETCH_RESTORE_PASSWORD as any, requestRestore),
    takeEvery(FETCH_REGISTRATION_GOOGLE, requestGoogle),
    takeEvery(FETCH_TOKEN_CHECK as any, requestTokenCheck),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
    takeEvery(FETCH_DIALOGS as any, requestDialogs),
    takeEvery(FETCH_FILTERED_DIALOGS, requestFiltered),
    takeEvery(FETCH_ACTIONS, requestActions),
    takeEvery(FETCH_USER as any, requestUser),
    takeEvery(FETCH_USER_UPDATE as any, requestUpdate),
    takeEvery(FETCH_USER_SETTINGS, requestSettings),
    takeEvery(FETCH_MESSAGES, requestMessages),
  ]);
}
