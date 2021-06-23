import { call, put, StrictEffect } from 'redux-saga/effects';
import { SET_DIALOGS             } from '../actions/dialogs';
import { requestChatrooms        } from './calls/calls';
import { requestFilter           } from './calls/calls';

/**
 * The requestFilterDialogs function filters dialogs
 * and adds to the store
 * @param {object} payload
 * @param {string} payload.text
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestFilterDialogs({payload: { text }}: any): Generator <
    StrictEffect, 
    any, 
    any
> {
    try {
        const search  : string = text.toLocaleLowerCase().trim();

        const chatsRef: any = yield call(requestChatrooms);
        const dialogs : any = yield call(requestFilter, chatsRef, search);

        yield put({
            type: SET_DIALOGS, 
            payload: { 
                dialogs 
            },
        }); 

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}