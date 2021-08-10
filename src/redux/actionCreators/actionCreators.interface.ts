export interface ActionCreator<T = any> {
  type: string;
  payload: T;
}
