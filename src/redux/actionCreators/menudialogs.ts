import { FETCH_DIALOGS, FETCH_DIALOGS_AVATAR, FETCH_DIALOGS_PHRASE, FETCH_DIALOGS_UPDATE } from '../actions/menudialogs';

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

export const requestAvatar = (uid: string) => {
    return {
        type: FETCH_DIALOGS_AVATAR,
        payload: {
            uid
        }
    }
}

export const requestSettings = (phrase: string) => {
    return {
        type: FETCH_DIALOGS_PHRASE,
        payload: {
            phrase,
        }
    }
}