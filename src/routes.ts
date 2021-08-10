import React from 'react';

import Authentication from './screens/enter/Authentication/Authentication';
import Registration from './screens/enter/Registration/Registration';
import Restore from './screens/enter/Restore/Restore';
import Update from './screens/enter/Update/Update';
import Messenger from './screens/Messenger/Messenger';
import Complited from './screens/Messenger/Dialogs/Complited/Complited';
import Noactives from './screens/Messenger/Dialogs/Noactives/Noactives';
import Сhatroom from './screens/Messenger/Сhatroom/Сhatroom';
import Actives from './screens/Messenger/Dialogs/Actives/Actives';
import Saved from './screens/Messenger/Dialogs/Saved/Saved';
import Home from './screens/Messenger/Dialogs/Home/Home';
import Line from './components/Line/Line';
import Name from './components/Name/Name';

import {
  AUTHENTICATION_ROUTE,
  REGISTRATION_ROUTE,
  MESSENGER_ROUTE,
  MENU_CONTENT_ACTIVES,
  MENU_CONTENT_COMPLITED,
  MENU_CONTENT_NOACTIVES,
  MENU_CONTENT_SAVED,
  MESSENGER_CHAT,
  RESTORE_PASSWORD_ROUTE,
  UPDATE_PASSWORD_ROUTE,
} from './utils/consts';

export interface Route {
  path: string;
  component: any;
}

export const publicRoutes: Route[] = [
  {
    path: AUTHENTICATION_ROUTE,
    component: Authentication,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Registration,
  },
  {
    path: RESTORE_PASSWORD_ROUTE,
    component: Restore,
  },
  {
    path: UPDATE_PASSWORD_ROUTE,
    component: Update,
  },
];

export const privateRoutes: Route[] = [
  {
    path: MESSENGER_ROUTE,
    component: Messenger,
  },
];

export const messengerRoutes: Route[] = [
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
];

export const contentRoutes: Route[] = [
  {
    path: MESSENGER_CHAT,
    component: Сhatroom,
  },
];

export const namebarRoutes: Route[] = [
  {
    path: MENU_CONTENT_NOACTIVES,
    component: Line,
  },
  {
    path: MESSENGER_CHAT,
    component: Name,
  },
];
