import { FETCH_AVATAR_SET        } from '../../actions/menudialogs';
import { call, put, StrictEffect } from 'redux-saga/effects';
import firebase                    from 'firebase';

const getAvatar = (uid: string) => {
    const operatorRef = firebase.storage();
    const operatorUrl = operatorRef
        .ref('avatars/' + uid)
        .getDownloadURL();
        
    return operatorUrl;
}

/**
 * requestAvatar
 * @param {object} payload
 * @param {object} dialogs contains all dialogs
 * @returns {Generator <StrictEffect, any, any>}  
 */
export default function* requestAvatar({ payload: { uid } }: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
      
        const avatar = yield call(getAvatar, uid);
        
        yield put({
            type: FETCH_AVATAR_SET,
            payload: {
                avatar: avatar
            }
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}