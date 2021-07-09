export interface State {
    dialogs: any[]
    uid: string
    avatar: string
    phrase: string
}

export interface Action {
    type: string
    payload: any
}