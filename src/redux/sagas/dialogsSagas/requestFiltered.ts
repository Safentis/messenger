import { put, StrictEffect  } from "redux-saga/effects";
import { FETCH_FILTERED_SET } from "../../actions/dialogs";

/**
 * @param {object} payload 
 * @param {object} payload.dialogs 
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* setFilteredDialogs({payload: { dialogs }}: any): Generator<
    StrictEffect,
    any,
    any
> {
    try {

        yield put({
            type: FETCH_FILTERED_SET,
            payload: {
                filtered: dialogs,
            },
        });

    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}