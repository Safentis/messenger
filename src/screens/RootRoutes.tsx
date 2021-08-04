import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { Route as RouteInterface } from '../routes';
import { RootReducerState } from "../redux/reducers/rootReducer.interface";
import { privateRoutes, publicRoutes } from "../routes";
import { AUTHENTICATION_ROUTE, MESSENGER_ROUTE } from "../utils/consts";

const RootRouter: FC = (): any => {
  const success: boolean = useSelector((state: RootReducerState) => {
    return state.authenticationReducer.success;
  });

  return success ? (
    <Switch>
      {privateRoutes.map(
        ({ path, component }: RouteInterface, index: number) => (
          <Route key={index} path={path} component={component} />
        )
      )}
      <Redirect to={MESSENGER_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(
        ({ path, component }: RouteInterface, index: number) => (
          <Route key={index} path={path} component={component} />
        )
      )}
      <Redirect to={AUTHENTICATION_ROUTE} />
    </Switch>
  );
};

export default RootRouter;
