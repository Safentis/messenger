import { 
    AUTHENTICATION_ROUTE, MESSENGER_ROUTE,    
    TABS_MENU_HISTORY, TABS_MENU_DIALOGS,     
    TABS_MENU_CLIPBOARD, TABS_MENU_SAVED,
    PAGE_CHAT,                    
} from './utils/consts';

//* LAYOUTS
import Authentication from './screens/Authentication/Authentication';
import Messenger      from './screens/Messenger/Messenger';
import Dialogs        from './layouts/Tabs/Dialogs/Dialogs';
import History        from './layouts/Tabs/History/History';
import Clipboard      from './layouts/Tabs/Clipboard/Clipboard';
import Chat           from './layouts/Chat/Chat';
import Saved          from './layouts/Tabs/Saved/Saved';

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
        path: TABS_MENU_SAVED,
        component: Saved
    },
    {
        path: TABS_MENU_CLIPBOARD,
        component: Clipboard
    },
];

export const messengerRoutes: RouteAttributes[] = [
    {
        path: PAGE_CHAT,
        component: Chat
    },
];