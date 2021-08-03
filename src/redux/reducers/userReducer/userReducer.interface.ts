export interface User {
  email: string;
  name: string;
  photo: string;
  uid: string; 
}

export interface Settings {
  greeting: string;
  greetings: string[];
};

export interface State {
  user: User;
  settings: Settings;
}

export interface Action {
  type: string;
  payload: any;
}
