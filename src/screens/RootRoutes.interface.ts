export interface AuthenticationReducer {
  success: boolean;
  token: string;
}

export interface RouteAttributes {
  path: string;
  component: any;
}
