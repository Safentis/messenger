import { LOADER_ON, LOADER_OFF } from "../../actions/loader";
import { State, Action        } from "./loaderReducer.interface";

const initialState: State = {
    loader: false
};

export const loaderReducer = (state = initialState, action: Action): State => {
    
    const type: string = action.type;

    switch(type) {
        case LOADER_ON:
            return {
                ...state,
                loader: true,
            }
        case LOADER_OFF:
            return {
                ...state,
                loader: false,
            }
        default:
            return state;
    }
}