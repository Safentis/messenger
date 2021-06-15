import { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AUTHENTICATION_ROUTE, HOMEPAGE_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes } from '../routes';

const RootRouter: FC = (): any => {
    
    const user: boolean = false;
    
    return user 
    ?
        (
            <Switch>
                {
                    privateRoutes.map(({path, component}, i) => 
                        <Route 
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