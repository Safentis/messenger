import { put, StrictEffect     } from 'redux-saga/effects';
import { SET_DIALOGS           } from '../actions/dialogs';

export default function* requestAllDialogs({payload: { dialogs }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        yield put({
            type: SET_DIALOGS,
            payload: {
                dialogs,
            }
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}