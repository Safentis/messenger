import { FETCH_DIALOGS_SET       } from '../../actions/menudialogs';
import { call, put, StrictEffect } from 'redux-saga/effects';
import firebase                    from 'firebase';

const updateStatus = (chatId: string, status: string, userUid: string): Promise <any> => {
    return new Promise((resolve, reject) => {
        resolve(
            firebase
            .database()
            .ref()
            .child('chatrooms')
        );
    })
    .then((chatroomsRef: any) => {
        chatroomsRef
            .child(chatId)
            .update({status, operatorId: userUid});
    });
}

/**
 * requestDialogs
 * @param {object} payload
 * @param {object} status contains all dialogs
 * @returns {Generator <StrictEffect, any, any>}  
 */
export default function* requestUpdate({ payload: { status, chatId, userUid } }: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {

        yield call(updateStatus, chatId, status, userUid);

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}