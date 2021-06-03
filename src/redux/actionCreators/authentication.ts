import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
} from '../actions/authentication';

export const requestAuthentication = (fields: any) => {
    return {
        type: FETCH_MESSAGES_REQUEST,
        payload: fields
    };
};

export const requestAuthenticationSuccess = () => {
    return {
        type: FETCH_MESSAGES_SUCCESS,
    }
}

export const requestAuthenticationFailure = () => {
    return {
        type: FETCH_MESSAGES_FAILURE,
    }
}