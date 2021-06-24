import { 
    FETCH_ALL_DIALOGS, 
    FETCH_FILTER_DIALOGS, 
    FETCH_SAVE_DIALOGS, 
} from "../actions/dialogs"

export const requestAllDialogs = (dialogs: any) => {
    return {
        type: FETCH_ALL_DIALOGS,
        payload: {
            dialogs,
        },
    };
};

export const requestFilterDialogs = (dialogs: any, text: string) => {
    return {
        type: FETCH_FILTER_DIALOGS,
        payload: {
            dialogs,
            text,
        },
    };
};

export const requestSaveDialogs = (dialog: any) => {
    return {
        type: FETCH_SAVE_DIALOGS,
        payload: {
            dialog,
        },
    };
};