import { put, StrictEffect } from 'redux-saga/effects';
import { COMPLITE_DIALOG   } from '../actions/dialogs';

export default function* requestCompliteDialog(): Generator <
    StrictEffect,
    any,
    any
> {
    try {

        yield put({
            type: COMPLITE_DIALOG,
        })
        

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}