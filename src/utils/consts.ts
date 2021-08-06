//* Main routing among states
export const AUTHENTICATION_ROUTE = "/authentication";
export const REGISTRATION_ROUTE = "/registration";
export const RESTORE_PASSWORD_ROUTE = "/restore";
export const UPDATE_PASSWORD_ROUTE = "/update";
export const MESSENGER_ROUTE = "/messenger";
export const MENU_CONTENT_ACTIVES = "/actives";
export const MENU_CONTENT_NOACTIVES = "/noactives";
export const MENU_CONTENT_SAVED = "/saved";
export const MENU_CONTENT_COMPLITED = "/complited";
export const MESSENGER_CHAT = "/:name/:key";

//* Greatings for forms
export const AUTH_SUCCESS_MESSAGE = "Wellcome back!";
export const RESTORE_SUCCESS_MESSAGE = "Сheck you email, a password reset email was sent there!";
export const REGISTRATION_SUCCESS_MESSAGE = "Wellcome to application!"
export const UPDATE_SUCCESS_MESSAGE = "Password has been changed";

//* RegExps password
export const REG_EXP_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
//* Password message
export const PASSWORD_VALIDATION_MESSAGE = "Password must will be with one Uppercase, one Lowercase, one Number and special Symbol";
//* Standart avatar for app
export const STANDART_AVATAR =
  "https://firebasestorage.googleapis.com/v0/b/messenger-b15ea.appspot.com/o/avatars%2Fanonymous-user.png?alt=media&token=227f86c4-efa1-4d33-839e-0ee6ae9fc7a8";
//* Request urls
export const SERVER_URL = "http://localhost:8080";
export const HEROKU_URL = "https://messenger-token-checker.herokuapp.com";