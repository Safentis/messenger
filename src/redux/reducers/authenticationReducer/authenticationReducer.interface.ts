export interface State {
  success: boolean;
  token: string;
}

export interface Action {
  type: string;
  payload: {
    token: string;
  };
}
