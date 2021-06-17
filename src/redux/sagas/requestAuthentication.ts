import { FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE } from '../actions/authentication';
import { LOADER_OFF, LOADER_ON                          } from '../actions/loader';
import { put, call, StrictEffect                        } from 'redux-saga/effects'
import firebase                                           from 'firebase';


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

export default function* requestAuthentication({payload: {values, setStatus}}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    yield put({ type: LOADER_ON });
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
    yield put({ type: LOADER_OFF });
  }
}