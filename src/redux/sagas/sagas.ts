import { takeEvery, all    } from 'redux-saga/effects'
import { 
  FETCH_EXITING_APP, 
  FETCH_MESSAGES_REQUEST, 
  FETCH_TOKEN_CHECK 
} from '../actions/authentication';
import { 
  FETCH_DIALOGS, 
  FETCH_DIALOGS_UPDATE       
} from '../actions/menudialogs';
import requestAuthentication from './authenticationSagas/requestAuthentication';
import requestSignOut        from './authenticationSagas/requestSignOut';
import requestTokenCheck     from './authenticationSagas/requestTokenCheck';
import requestDialogs        from './menudialogsReducer/requestDialogs';
import requestUpdate         from './menudialogsReducer/requestUpdate';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
    takeEvery(FETCH_DIALOGS, requestDialogs),
    takeEvery(FETCH_DIALOGS_UPDATE, requestUpdate),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
  ]);
}