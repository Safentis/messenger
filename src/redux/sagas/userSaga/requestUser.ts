import { put, StrictEffect } from 'redux-saga/effects';
import { FETCH_USER_SET    } from '../../actions/user';

/**
 * @param {object} payload 
 * @param {object} payload.user 
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestUser({payload: { user }}: any): Generator<
    StrictEffect,
    any,
    any
> {
    try {
        const info = {
           email   : user.email,
           name    : user.displayName,
           photo   : user.photoURL,
           uid     : user.uid,
        };

        yield put({
            type: FETCH_USER_SET,
            payload: {
                user: info,
            },
        })

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}