import {
  AUTHENTICATION_ROUTE,
  MESSENGER_ROUTE,
  MENU_CONTENT_ACTIVES,
  MENU_CONTENT_COMPLITED,
  MENU_CONTENT_NOACTIVES,
  MENU_CONTENT_SAVED,
  MESSENGER_CHAT,
} from "./utils/consts";

import Authentication from "./screens/Authentication/Authentication";
import Messenger from "./screens/Messenger/Messenger";

import Home from "./screens/Messenger/Dialogs/Home/Home";
import Actives from "./screens/Messenger/Dialogs/Actives/Actives";
import Noactives from "./screens/Messenger/Dialogs/Noactives/Noactives";
import Complited from "./screens/Messenger/Dialogs/Complited/Complited";
import Saved from "./screens/Messenger/Dialogs/Saved/Saved";
import Сhatroom from "./screens/Messenger/Сhatroom/Сhatroom";

export const publicRoutes = [
  {
    path: AUTHENTICATION_ROUTE,
    component: Authentication,
  },
];

export const privateRoutes = [
  {
    path: MESSENGER_ROUTE,
    component: Messenger,
  },
];

export const messengerRoutes = [
  // {
  //     path: MESSENGER_ROUTE,
  //     component: Home
  // },
  {
    path: MENU_CONTENT_ACTIVES,
    component: Actives,
  },
  {
    path: MENU_CONTENT_NOACTIVES,
    component: Noactives,
  },
  {
    path: MENU_CONTENT_COMPLITED,
    component: Complited,
  },
  {
    path: MENU_CONTENT_SAVED,
    component: Saved,
  },
  {
    path: MESSENGER_CHAT,
    component: Сhatroom,
  },
];
