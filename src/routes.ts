import { AUTHENTICATION_ROUTE, MESSENGER_ROUTE } from "./utils/consts";
import Authentication from "./screens/Authentication/Authentication";
import Messenger      from "./screens/Messenger/Messenger";

export const publicRoutes  = [
    {
        path: AUTHENTICATION_ROUTE,
        component: Authentication
    }
];

export const privateRoutes = [
    {
        path: MESSENGER_ROUTE,
        component: Messenger
    }
];