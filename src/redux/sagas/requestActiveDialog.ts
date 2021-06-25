import { put, StrictEffect } from 'redux-saga/effects';
import { COMPLITE_DIALOG, SET_ACTIVE_DIALOG } from '../actions/dialogs';

export default function* requestActiveDialog({payload: { chatId }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {

        yield put({
            type: SET_ACTIVE_DIALOG,
            payload: {
                chatId
            }
        })

        yield put({
            type: COMPLITE_DIALOG,
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}