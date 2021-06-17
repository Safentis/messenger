import { FC                                    } from 'react';
import { useSelector                           } from 'react-redux';
import { Route, Switch, Redirect               } from 'react-router-dom';
import { AuthenticationReducer                 } from './RootRoutes.interface';
import { AUTHENTICATION_ROUTE, MESSENGER_ROUTE } from '../utils/consts';
import { privateRoutes, publicRoutes           } from '../routes';

const RootRouter: FC = (): any => {
    const { success }: AuthenticationReducer = useSelector((state: any) => state.authenticationReducer);

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
                <Redirect to={MESSENGER_ROUTE} />
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