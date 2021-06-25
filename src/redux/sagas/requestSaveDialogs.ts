import { put, StrictEffect } from 'redux-saga/effects';
import { SAVE_DIALOGS      } from '../actions/dialogs';

export default function* requestSaveDialogs({payload: { dialog }}: any): Generator <
    StrictEffect, 
    any, 
    any
> {
    try {
        
        yield put({
            type: SAVE_DIALOGS, 
            payload: {
                dialog,
            }
        });
        

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}