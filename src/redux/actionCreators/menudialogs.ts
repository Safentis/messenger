import { FETCH_DIALOGS, FETCH_DIALOGS_UPDATE } from '../actions/menudialogs';

export const requestDialogs = (dialogs: any[]): any => {
    return {
        type: FETCH_DIALOGS,
        payload: {
            dialogs,
        },
    };
};

export const requestUpdate = (status: string, chatId: string, userUid: string): any => {
    return {
        type: FETCH_DIALOGS_UPDATE,
        payload: {
            status,
            chatId,
            userUid,
        },
    };
};