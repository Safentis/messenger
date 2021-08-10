import { put, StrictEffect } from 'redux-saga/effects';

import { FETCH_DIALOGS_SET } from '../../actions/dialogs';
import { RequestProps } from '../sagas.interface';
import { Chatrooms } from '../../../screens/Root.interface';

/**
 * @param {RequestProps} payload
 * @param {Chatrooms} payload.dialogs
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestDialogs({
  payload: { dialogs },
}: RequestProps<Chatrooms>): Generator<StrictEffect, void, any> {
  try {
    yield put({
      type: FETCH_DIALOGS_SET,
      payload: {
        dialogs,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
