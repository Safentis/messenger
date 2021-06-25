export interface State {
    dialogs: any[]
    filter : any[]
    saves  : any[]
    actives: any[]
    complites: any[]
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