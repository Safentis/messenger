import { State, Action     } from './menudialogsReducer.interface';
import { FETCH_DIALOGS_SET } from '../../actions/menudialogs';

const initialState: State = {
    dialogs: [],
    uid: '',
}

export const menudialogsReducer = (state = initialState, action: Action): State => {

    const type: string = action?.type;
    const uid: string = action?.payload?.uid;
    const dialogs: any = action?.payload?.dialogs;
    
    switch (type) {

        case FETCH_DIALOGS_SET:
            return {
                ...state,
                dialogs,
                uid,
            }
        default:
            return state;
    }
}