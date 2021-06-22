import { AUTHENTICATION_ROUTE, MESSENGER_ROUTE    } from './utils/consts';
import { TABS_MENU_HISTORY, TABS_MENU_DIALOGS     } from './utils/consts';
import { TABS_MENU_ADDRESSES, TABS_MENU_CLIPBOARD } from './utils/consts';

//* LAYOUTS
import Authentication from "./screens/Authentication/Authentication";
import Messenger      from "./screens/Messenger/Messenger";
import Dialogs        from './layouts/Tabs/Dialogs/Dialogs';
import History        from './layouts/Tabs/History/History';
import Addresses      from './layouts/Tabs/Addresses/Addresses';
import Clipboard      from './layouts/Tabs/Clipboard/Clipboard';

export interface RouteAttributes {
    path: string
    component: any
}

export const publicRoutes: RouteAttributes[]  = [
    {
        path: AUTHENTICATION_ROUTE,
        component: Authentication
    }
];

export const privateRoutes: RouteAttributes[] = [
    {
        path: MESSENGER_ROUTE,
        component: Messenger
    }
];

export const tabsRoutes: RouteAttributes[] = [
    {
        path: TABS_MENU_HISTORY,
        component: History
    },
    {
        path: TABS_MENU_DIALOGS,
        component: Dialogs
    },
    {
        path: TABS_MENU_ADDRESSES,
        component: Addresses
    },
    {
        path: TABS_MENU_CLIPBOARD,
        component: Clipboard
    }
];