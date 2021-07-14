import { 
    FETCH_ACTIONS,
    FETCH_DIALOGS, 
    FETCH_FILTERED_DIALOGS 
} from '../actions/dialogs';

export const requestDialogs = () => {
    return {
        type: FETCH_DIALOGS,
        payload: {
            
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

export const setFilteredDialogs = (dialogs: any[]) => {
    return {
        type: FETCH_FILTERED_DIALOGS,
        payload: {
            dialogs
        }
    }
}