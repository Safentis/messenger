import { FETCH_ALL_DIALOGS, FETCH_FILTER_DIALOGS } from "../actions/dialogs"

export const requestAllDialogs = () => {
    return {
        type: FETCH_ALL_DIALOGS,
    }
};

export const requestFilterDialogs = (text: string) => {
    return {
        type: FETCH_FILTER_DIALOGS,
        payload: {
            text
        }
    }
};