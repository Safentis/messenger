import { SET_DIALOGS             } from '../../actions/dialogs';
import { State, Actions, Message } from './dialogsReducer.interface';

const initialState: State = {
    dialogs: []
};

export const dialogsReducer = (state = initialState, action: Actions): State => {
    const type   : string    = action.type;
    const dialogs: Message[] = action?.payload?.dialogs;

    switch(type) {
        case SET_DIALOGS:
            return {
                ...state,
                dialogs
            };
        default:
            return state;
    }
} 