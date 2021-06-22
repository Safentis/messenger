export interface State {
    dialogs: any[]
}

export interface Actions {
    type: string,
    payload?: any 
}

export interface Message {
    content   : string, 
    timestamp : number, 
    writtenBy : string
}