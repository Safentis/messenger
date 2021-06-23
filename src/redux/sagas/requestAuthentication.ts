import { FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE } from '../actions/authentication';
import { LOADER_OFF, LOADER_ON                          } from '../actions/loader';
import { put, call, StrictEffect                        } from 'redux-saga/effects'
import { getIdToken, signInAccount                      } from './calls/calls';

/**
 * getIdToken
 * @param {object} payload
 * @param {object} value contains email and password fields
 * @param {function} setStatus is function for handle of form status with api formik
 * @returns {Generator <StrictEffect, any, any>}  
 */
export default function* requestAuthentication({payload: {values, setStatus}}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    yield put({ type: LOADER_ON });
    yield call(signInAccount, values);

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
    console.error('Code ', err.code)
    console.error('Message ', err.message);
    //* If the request is rejected
    //* we set status on false
    setStatus(false);
    
    yield put({type: FETCH_MESSAGES_FAILURE});
  } finally {
    yield put({ type: LOADER_OFF });
  }
}