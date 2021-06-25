import { SAVE_DIALOGS, SET_ACTIVE_DIALOG, SET_DIALOGS, SET_FILTER, DELETE_DIALOG, COMPLITE_DIALOG } from '../../actions/dialogs';
import { State, Actions, Message               } from './dialogsReducer.interface';
import * as _                                    from 'lodash';

const initialState: State = {
    dialogs: [],
    filter : [],
    saves  : [],
    actives: [],
    complites: [],
};

export const dialogsReducer = (state = initialState, action: Actions): State => {
    const newState: State = { ...state };
    const type: string = action.type,
       dialogs: any[]  = action?.payload?.dialogs,
       dialog : any    = action?.payload?.dialog,
       filter : any[]  = action?.payload?.filter,
       chatId : string = action?.payload?.chatId


    switch(type) {
        case SET_DIALOGS:
            return {
                ...state,
                dialogs,
            };
        case SET_FILTER:
            return {
                ...state,
                filter,
            };
        case SAVE_DIALOGS:
            const newArray: any[] = [...newState.saves, dialog];

            //* We are creating of the uniq elements
            newState.saves = _.uniqBy(newArray, (dialog) => {
                return dialog.chatId;
            });

            return newState;
        case SET_ACTIVE_DIALOG:

            const activeDialog: any = _.find(newState.filter, (dialog) => {
                if (dialog.chatId === chatId) {
                    dialog.status = 'active';
                    return dialog;
                }
            });

            newState.actives.push(activeDialog);
            newState.actives = _.uniqBy(newState.actives, (dialog) => {
                return dialog.chatId;
            });

            console.log(newState.actives)

            return newState;
        case DELETE_DIALOG:

            newState.saves = _.filter(newState.saves, (dialog) => {
                return dialog.chatId !== chatId;
            });

            return newState;
        case COMPLITE_DIALOG:

            const compliteDialog = _.find(newState.actives, (dialog) => {
                return dialog.complite === true;
            });


            if (compliteDialog) {
                _.remove(newState.actives, (dialog) => {
                    return dialog.complite === true;
                });
                newState.complites.push(compliteDialog)
            }
            console.log('cd ', compliteDialog)


            newState.complites = _.uniqBy(newState.complites, (dialog) => {
                return dialog.complite === true;
            });

            return newState;
        default:
            return state;
    }
} 