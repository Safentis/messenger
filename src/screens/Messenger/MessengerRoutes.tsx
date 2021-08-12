import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Route as RouteInterface } from '../../routes';

const MessengerRoutes = ({ dialogs, user, settings, routes }: any): React.ReactElement => {
  //* -----------------------------------------------------
  //* Base URL for routes
  const { url }: any = useRouteMatch();

  return (
    <Switch>
      {routes.map(({ path, component: Component }: RouteInterface, index: number) => (
        <Route path={url + path} exact={false} key={index}>
          <Component settings={settings} dialogs={dialogs} user={user} />
        </Route>
      ))}
    </Switch>
  );
};

export default MessengerRoutes;
