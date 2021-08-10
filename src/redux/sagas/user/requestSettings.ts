import { put, StrictEffect } from 'redux-saga/effects';

import { handleError } from '../../../utils/functions';
import { FETCH_USER_SETTINGS_SET } from '../../actions/user';
import { Settings } from '../../reducers/userReducer/userReducer.interface';
import { RequestProps } from '../sagas.interface';

export interface RequestSettings {
  settings: Settings;
  closeModal: Function;
}

/**
 * @param {RequestSettings} payload
 * @param {Settings} payload.settings
 * @param {Function} payload.settings
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestSettings({
  payload: { settings, closeModal },
}: RequestProps<RequestSettings>): Generator<StrictEffect, void, any> {
  try {
    yield closeModal();
    yield put({
      type: FETCH_USER_SETTINGS_SET,
      payload: {
        settings,
      },
    });
  } catch (error) {
    handleError(error);
  }
}
