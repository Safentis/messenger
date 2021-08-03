import { ActionCreator } from "../actionCreators.interface";
import { FETCH_RESTORE_PASSWORD } from "../actions/restore";

export const requestRestore = (email: string): ActionCreator<{email: string}> => {
    return {
        type: FETCH_RESTORE_PASSWORD,
        payload: {
            email,
        },
    };
};