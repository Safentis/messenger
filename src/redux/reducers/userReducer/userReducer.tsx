import { State, Action } from './userReducer.interface';
import { 
    FETCH_USER_SET
} from '../../actions/user';

const initialState: State = {
    user: {}
};

export const userReducer = (state = initialState, { type, payload }: Action): State => {
    const user: any = payload?.user;

    switch(type) {
        case FETCH_USER_SET:
            return {
                ...state,
                user
            };
        default:
            return state;
    };
};