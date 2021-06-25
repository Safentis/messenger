import { put, StrictEffect } from 'redux-saga/effects';
import { DELETE_DIALOG     } from '../actions/dialogs';

export default function* requestActiveDialog({payload: { chatId }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {

        yield put({
            type: DELETE_DIALOG,
            payload: {
                chatId
            }
        })

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}