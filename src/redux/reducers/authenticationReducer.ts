import { State, Actions } from './authenticationReducerinterface';
import {
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
} from '../actions/authentication';

const initialState: State = {
    loading : false,
    error   : false,
};

export const authenticationReducer = (state = initialState, action: Actions): State => {
    //* Actions
    const type: string = action.type;

    switch(type) {
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: true
            };
        case FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};