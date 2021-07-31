import { takeEvery, all } from "redux-saga/effects";

import requestAuthentication from "./authenticationSagas/requestAuthentication";
import requestSignOut from "./authenticationSagas/requestSignOut";
import requestTokenCheck from "./authenticationSagas/requestTokenCheck";

import requestDialogs from "./dialogsSagas/requestDialogs";
import requestFiltered from "./dialogsSagas/requestFiltered";
import requestActions from "./dialogsSagas/requestActions";
import requestMessages from "./dialogsSagas/requestMessages";

import requestUser from "./userSaga/requestUser";
import requestUpdate from "./userSaga/requestUpdate";
import requestSettings from "./userSaga/requestSettings";

import {
  FETCH_EXITING_APP,
  FETCH_MESSAGES_REQUEST,
  FETCH_TOKEN_CHECK,
} from "../actions/authentication";

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

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
    takeEvery(FETCH_DIALOGS, requestDialogs),
    takeEvery(FETCH_FILTERED_DIALOGS, requestFiltered),
    takeEvery(FETCH_ACTIONS, requestActions),
    takeEvery(FETCH_USER, requestUser),
    takeEvery(FETCH_USER_UPDATE, requestUpdate),
    takeEvery(FETCH_USER_SETTINGS, requestSettings),
    takeEvery(FETCH_MESSAGES, requestMessages),
  ]);
}
