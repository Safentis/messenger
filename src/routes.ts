import { 
    AUTHENTICATION_ROUTE, 
    MENU_CONTENT_ACTIVES, 
    MENU_CONTENT_COMPLITED, 
    MENU_CONTENT_DIALOGS, 
    MENU_CONTENT_SAVED, 
    MESSENGER_CHAT, 
    MESSENGER_ROUTE,                
} from './utils/consts';

import Authentication from './screens/Authentication/Authentication';
import Messenger      from './screens/Messenger/Messenger';
import Chatroom       from './layouts/Chatroom/Chatroom';

export const publicRoutes = [
    {
        path: AUTHENTICATION_ROUTE,
        component: Authentication
    }
];

export const privateRoutes = [
    {
        path: MESSENGER_ROUTE,
        component: Messenger
    },
];

export const menuRoutes = [
    {
        path: MENU_CONTENT_ACTIVES,
        status: 'active',
    },
    {
        path: MENU_CONTENT_DIALOGS,
        status: 'noactive',
    },
    {
        path: MENU_CONTENT_SAVED,
        status: 'saved',
    },
    {
        path: MENU_CONTENT_COMPLITED,
        status: 'complited',
    },
];

export const chatRoutes = [
    {
        path: MESSENGER_CHAT,
        component: Chatroom,
    }
]