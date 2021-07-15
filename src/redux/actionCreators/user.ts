import { FETCH_USER } from "../actions/user"

export const requestUser = ({user}: any) => {
    return {
        type: FETCH_USER,
        payload: {
            user
        },
    };
};