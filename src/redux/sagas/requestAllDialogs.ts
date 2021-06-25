import { put, StrictEffect     } from 'redux-saga/effects';
import { COMPLITE_DIALOG, SET_DIALOGS           } from '../actions/dialogs';

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

        yield put({
            type: COMPLITE_DIALOG,
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}