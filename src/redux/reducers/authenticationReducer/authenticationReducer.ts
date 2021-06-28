import { State, Actions } from './authenticationReducer.interface';
import { 
    FETCH_MESSAGES_SUCCESS, 
    FETCH_MESSAGES_FAILURE, 
    FETCH_EXITING_APP 
} from '../../actions/authentication';

const initialState: State = {
    success: false,
    token  : '', 
};

export const authenticationReducer = (state = initialState, action: Actions): State => {
    const type : string = action.type;
    const token: string = action?.payload?.token;

    switch(type) {
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                success: true,
                token: token,
            };
        case FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                success: false,
                token: ''
            };
        case FETCH_EXITING_APP:
            return {
                ...state,
                success: false,
                token: ''
            }
        default:
            return state;
    };
};