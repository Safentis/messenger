import { AUTHENTICATION_ROUTE, HOMEPAGE_ROUTE } from "./utils/consts";
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
        path: HOMEPAGE_ROUTE,
        component: Messenger
    }
];