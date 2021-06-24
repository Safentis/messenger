//* Main routing betwean by two pages authentication and messenger
export const AUTHENTICATION_ROUTE = '/authentication';
export const MESSENGER_ROUTE      = '/messenger';

//* Nested routing for tabs
export const TABS_MENU_HISTORY    = '/history';
export const TABS_MENU_DIALOGS    = '/dialogs';
export const TABS_MENU_ADDRESSES  = '/addresses';
export const TABS_MENU_CLIPBOARD  = '/clipboard';

//* Pages
export const PAGE_HOME            = '/:name';
export const PAGE_CHAT            = '/:name/:chatId';