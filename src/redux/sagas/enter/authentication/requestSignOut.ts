import firebase from 'firebase';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { EXITING_APP } from '../../../actions/authentication';

export const signOutAccount = () => {
  return firebase.auth().signOut();
};

/**
 * @param {object} payload
 * @param {string} payload.type
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestTokenCheck(): Generator<StrictEffect, any, any> {
  try {
    yield call(signOutAccount);
    yield put({
      type: EXITING_APP,
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
