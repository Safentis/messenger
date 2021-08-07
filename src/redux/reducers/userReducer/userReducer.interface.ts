export interface UserStore {
  email: string | null;
  name: string | null;
  photo: string | null;
  uid: string; 
}

export interface Settings {
  greeting: string;
  greetings: string[];
};

export interface State {
  user: UserStore;
  settings: Settings;
}

export interface Action {
  type: string;
  payload: any;
}
