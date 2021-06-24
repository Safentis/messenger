import { 
    AUTHENTICATION_ROUTE, MESSENGER_ROUTE,    
    TABS_MENU_HISTORY, TABS_MENU_DIALOGS,     
    TABS_MENU_ADDRESSES, TABS_MENU_CLIPBOARD, 
    PAGE_CHAT, PAGE_HOME                     
} from './utils/consts';

//* LAYOUTS
import Authentication from './screens/Authentication/Authentication';
import Messenger      from './screens/Messenger/Messenger';
import Dialogs        from './layouts/Tabs/Dialogs/Dialogs';
import History        from './layouts/Tabs/History/History';
import Addresses      from './layouts/Tabs/Addresses/Addresses';
import Clipboard      from './layouts/Tabs/Clipboard/Clipboard';
import Chat           from './layouts/Chat/Chat';
// import Home           from './layouts/Pages/Home/Home';

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
    },
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
    },
];

export const messengerRoutes: RouteAttributes[] = [
    {
        path: PAGE_HOME,
        component: () => 'Home'
    },
    {
        path: PAGE_CHAT,
        component: Chat
    },
];