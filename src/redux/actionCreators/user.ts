import { FETCH_USER, FETCH_USER_SETTINGS, FETCH_USER_UPDATE } from '../actions/user'

export const requestUser = ({user}: any) => {
    return {
        type: FETCH_USER,
        payload: {
            user
        },
    };
};

export const requestUpdate = ({user, closeModal}: any) => {
    return {
        type: FETCH_USER_UPDATE,
        payload: {
            user,
            closeModal
        }
    }
}

export const requestSettings = ({settings, closeModal}: any) => {
    return {
        type: FETCH_USER_SETTINGS,
        payload: {
            settings,
            closeModal
        }
    }
}