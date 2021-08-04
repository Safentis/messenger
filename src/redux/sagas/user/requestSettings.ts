import { put, StrictEffect } from "redux-saga/effects";
import { handleError } from "../../../utils/functions";
import { FETCH_USER_SETTINGS_SET } from "../../actions/user";

/**
 * @param {object} payload
 * @param {object} payload.settings
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestSettings({
  payload: { settings, closeModal },
}: any): Generator<StrictEffect, void, any> {
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
