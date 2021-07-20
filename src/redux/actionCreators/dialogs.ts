import { 
    FETCH_ACTIONS,
    FETCH_DIALOGS, 
    FETCH_FILTERED_DIALOGS, 
    FETCH_MESSAGES
} from '../actions/dialogs';

export const requestDialogs = (dialogs: any) => {
    return {
        type: FETCH_DIALOGS,
        payload: {
            dialogs
        }
    }
}

export const requestActions = ({chatId, body}: any) => {
    return {
        type: FETCH_ACTIONS,
        payload: {
            chatId,
            body
        }
    }
}

export const requestMessages = ({chatId, body}: any) => {
    return {
        type: FETCH_MESSAGES,
        payload: {
            chatId,
            body
        }
    }
}

export const setFilteredDialogs = (dialogs: any) => {
    return {
        type: FETCH_FILTERED_DIALOGS,
        payload: {
            dialogs
        }
    }
}
