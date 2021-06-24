import { SAVE_DIALOGS, SET_DIALOGS, SET_FILTER } from '../../actions/dialogs';
import { State, Actions, Message               } from './dialogsReducer.interface';
import * as _                                    from 'lodash';

const initialState: State = {
    dialogs: [],
    filter : [],
    saves  : [],
};

export const dialogsReducer = (state = initialState, action: Actions): State => {
    const type: string = action.type,
       dialogs: any[]  = action?.payload?.dialogs,
       dialog : any    = action?.payload?.dialog,
       filter : any[]  = action?.payload?.filter;

    switch(type) {
        case SET_DIALOGS:
            return {
                ...state,
                dialogs,
                filter
            };
        case SET_FILTER:
            return {
                ...state,
                filter,
            };
        case SAVE_DIALOGS:
            const newState: State = { ...state };
            const newArray: any[] = [...newState.saves, dialog];

            //* We are creating of the uniq elements
            newState.saves = _.uniqBy(newArray, (dialog) => {
                return dialog.chatId;
            });
            
            return newState;
        default:
            return state;
    }
} 