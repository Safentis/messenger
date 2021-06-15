import { FC                                   } from 'react';
import { useSelector                          } from 'react-redux';
import { AuthenticationRouter                 } from './RootRoutes.interface';
import { Route, Switch, Redirect              } from 'react-router-dom';
import { AUTHENTICATION_ROUTE, HOMEPAGE_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes          } from '../routes';

const RootRouter: FC = (): any => {
    const { success, token }: AuthenticationRouter = useSelector((state: any) => state.authenticationReducer);

    return success
    ?
        (
            <Switch>
                {
                    privateRoutes.map(({path, component}, i) => 
                        <Route 
                            key={i}
                            path={path} 
                            exact={true}
                            component={component} 
                        />
                    )
                }
                <Redirect to={HOMEPAGE_ROUTE} />
            </Switch>
        )
    :   
        (
            <Switch>
                {
                    publicRoutes.map(({path, component}, i) => 
                        <Route 
                            key={i}
                            path={path}
                            exact={true} 
                            component={component} 
                        />
                    )
                }
                <Redirect to={AUTHENTICATION_ROUTE} />
            </Switch>
        );
};

export default RootRouter;