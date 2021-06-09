export interface State {
    success: boolean
    token  : string
};

export interface Actions {
    type    : string
    payload : {
        token: string
    }
};
