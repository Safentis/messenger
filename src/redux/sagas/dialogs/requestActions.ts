import { call, StrictEffect } from 'redux-saga/effects';
import { DateType } from '../../../screens/Root.interface';

import { fetchActions } from '../../../utils/functions';
import { RequestProps } from '../sagas.interface';

export interface FetchActions {
  chatId: string;
  body: {
    status?: string;
    operatorId?: string;
    begun?: DateType;
    saved?: string;
  };
}

/**
 * @param {FetchActions} payload
 * @param {string} payload.chatId
 * @param {object} payload.body
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestActions({
  payload: { chatId, body },
}: RequestProps<FetchActions>): Generator<StrictEffect, void, any> {
  try {
    yield call(fetchActions, { chatId, body });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
