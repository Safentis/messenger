import {FETCH_PHRASE_SET         } from '../../actions/menudialogs';
import { call, put, StrictEffect } from 'redux-saga/effects';
import firebase                    from 'firebase';

/**
 * requestPhrase
 * @param {object} payload
 * @param {object} dialogs contains all dialogs
 * @returns {Generator <StrictEffect, any, any>}  
 */
export default function* requestPhrase({ payload: { phrase } }: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        yield put({
            type: FETCH_PHRASE_SET,
            payload: {
                phrase
            }
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}