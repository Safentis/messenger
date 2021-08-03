export interface Props {}
export type avatarType = [string, Function];
export type fileType = [object, Function];
export type submitType = {
  password: string;
  passwordRepeat: string;
  name: string;
};

export interface ProfileInterface {
  name: string;
  file: object;
  uid: string;
  password: string;
}
