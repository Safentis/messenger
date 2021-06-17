import { LOADER_ON, LOADER_OFF } from "../actions/loader"

export const loaderOn = () => {
    return {
        type: LOADER_ON,
    }
}

export const loaderOff = () => {
    return {
        type: LOADER_OFF,
    }
}