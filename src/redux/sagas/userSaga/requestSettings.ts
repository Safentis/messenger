import { put, StrictEffect       } from 'redux-saga/effects';
import { FETCH_USER_SETTINGS_SET } from '../../actions/user';

/**
 * @param {object} payload 
 * @param {object} payload.settings
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestSettings({payload: { settings, closeModal }}: any): Generator<
    StrictEffect,
    any,
    any
> {
    try {
 
        yield closeModal();
        yield put({
            type: FETCH_USER_SETTINGS_SET,
            payload: {
                settings,
            },
        });

    } catch(err) {
        console.error('Code ', err.code);
        console.error('Message ', err.message);
    }
}