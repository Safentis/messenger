import { takeEvery, all    } from 'redux-saga/effects'
import { 
  FETCH_EXITING_APP, 
  FETCH_MESSAGES_REQUEST, 
  FETCH_TOKEN_CHECK 
} from '../actions/authentication';
import { 
  FETCH_DIALOGS, 
  FETCH_DIALOGS_UPDATE,
  FETCH_DIALOGS_AVATAR,
  FETCH_DIALOGS_PHRASE,      
} from '../actions/menudialogs';
import requestAuthentication from './authenticationSagas/requestAuthentication';
import requestSignOut        from './authenticationSagas/requestSignOut';
import requestTokenCheck     from './authenticationSagas/requestTokenCheck';
import requestAvatar         from './menudialogsReducer/requestAvatar';
import requestDialogs        from './menudialogsReducer/requestDialogs';
import requestUpdate         from './menudialogsReducer/requestUpdate';
import requestPhrase         from './menudialogsReducer/reqyestPhrase';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MESSAGES_REQUEST, requestAuthentication),
    takeEvery(FETCH_TOKEN_CHECK, requestTokenCheck),
    takeEvery(FETCH_DIALOGS, requestDialogs),
    takeEvery(FETCH_DIALOGS_UPDATE, requestUpdate),
    takeEvery(FETCH_EXITING_APP, requestSignOut),
    takeEvery(FETCH_DIALOGS_AVATAR, requestAvatar),
    takeEvery(FETCH_DIALOGS_PHRASE, requestPhrase),
  ]);
}