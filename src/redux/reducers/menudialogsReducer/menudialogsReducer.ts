import { State, Action     } from './menudialogsReducer.interface';
import { FETCH_AVATAR_SET, FETCH_DIALOGS_SET } from '../../actions/menudialogs';

const initialState: State = {
    dialogs: [],
    uid: '',
    avatar: '',
}

export const menudialogsReducer = (state = initialState, action: Action): State => {

    const type: string = action?.type;
    const uid: string = action?.payload?.uid;
    const dialogs: any = action?.payload?.dialogs;
    const avatar: any = action?.payload?.avatar;
    
    switch (type) {

        case FETCH_DIALOGS_SET:
            return {
                ...state,
                dialogs,
                uid,
            }
        case FETCH_AVATAR_SET:
            return {
                ...state,
                avatar,
            }
        default:
            return state;
    }
}