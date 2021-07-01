import { FETCH_DIALOGS_SET } from '../../actions/menudialogs';
import { call, put, StrictEffect } from 'redux-saga/effects';
import firebase              from 'firebase';

const getUid = (): Promise <any> => {
    return new Promise((resolve, reject) => {
        return resolve(firebase.auth().currentUser?.uid);
    });
};

/**
 * requestDialogs
 * @param {object} payload
 * @param {object} dialogs contains all dialogs
 * @returns {Generator <StrictEffect, any, any>}  
 */
export default function* requestDialogs({ payload: { dialogs } }: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        const uid: string = yield call(getUid);
        
        yield put({
            type: FETCH_DIALOGS_SET,
            payload: {
                dialogs,
                uid,
            },
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}