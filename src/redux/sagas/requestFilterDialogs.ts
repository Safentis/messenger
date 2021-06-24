import { call, put, StrictEffect } from 'redux-saga/effects';
import { SET_DIALOGS        } from '../actions/dialogs';

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

export default function* requestFilterDialogs({payload: { dialogs: arrayDialogs, text }}: any): Generator <
    StrictEffect,
    any,
    any
> {
    try {
        const search: string = text.toLowerCase().trim();
        const dialogs: any[] = yield call(filterDialogs, arrayDialogs, search);

        yield put({
            type: SET_DIALOGS,
            payload: {
                dialogs
            }
        });
    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}