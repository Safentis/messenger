import firebase         from 'firebase';
import { put, StrictEffect } from 'redux-saga/effects';
import { SET_DIALOGS  } from '../actions/dialogs';
import { LOADER_OFF, LOADER_ON } from '../actions/loader';

export default function* requestAllDialogs({payload: { dialogs }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        yield put({ type: LOADER_ON });
        yield put({
            type: SET_DIALOGS,
            payload: {
                dialogs,
            }
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    } finally {
        yield put({ type: LOADER_OFF });
    }
}