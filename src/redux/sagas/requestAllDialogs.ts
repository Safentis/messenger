import { call, put, StrictEffect } from '@redux-saga/core/effects';
import { SET_DIALOGS             } from '../actions/dialogs';
import { requestChatrooms        } from './calls/calls';
import { requestDilaogs          } from './calls/calls';

/**
 * The requestAllDialogs function adds dialogs
 * from the firebase and adds to the store 
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestAllDialogs(): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        let chatsRef: any = yield call(requestChatrooms);
        let dialogs : any = yield call(requestDilaogs, chatsRef);

        yield put({
            type: SET_DIALOGS, 
            payload: { 
                dialogs 
            },
        }); 
        
    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    } finally {
        console.log('requestDilaogs End')
    }
}