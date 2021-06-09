import { FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE } from '../actions/authentication';
import { State, Actions } from './authenticationReducer.interface';

const initialState: State = {
    success : false,
};

export const authenticationReducer = (state = initialState, action: Actions): State => {
    //* Actions
    const type: string = action.type;

    switch(type) {
        case FETCH_MESSAGES_SUCCESS:
            return {
                success: true,
            };
        case FETCH_MESSAGES_FAILURE:
            return {
                success: false,
            };
        default:
            return state;
    };
};