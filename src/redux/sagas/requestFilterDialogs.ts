import { call, put, StrictEffect } from 'redux-saga/effects';
import { SET_DIALOGS, SET_FILTER } from '../actions/dialogs';
import { LOADER_OFF, LOADER_ON } from '../actions/loader';

export const filterDialogs = (dialogs: any[], search: string): Promise <any> => {

    return new Promise((resolve, reject) => {
        
        const filtered: any[] = dialogs.filter((child: any, index: number): void => {
            //* We create filters to client and content
            const client : string = child.client.toLocaleLowerCase().trim();
            const content: string = child.messages[index].content.toLocaleLowerCase().trim();

            if (client.includes(search) || content.includes(search)) {
                return child;
            }
        });

        return resolve(filtered);
    });
}

export default function* requestFilterDialogs({payload: { dialogs, text }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        const search: string = text.toLowerCase().trim();
        const filter: any[] = yield call(filterDialogs, dialogs, search);

        yield put({
            type: SET_FILTER,
            payload: {
                filter
            }
        });
    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}