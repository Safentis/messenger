import { FC                                     } from 'react';
import { useSelector                            } from 'react-redux';
import { Route, Switch, Redirect                } from 'react-router-dom';
import { AuthenticationReducer, RouteAttributes } from './RootRoutes.interface';
import { AUTHENTICATION_ROUTE, MESSENGER_ROUTE  } from '../utils/consts';
import { privateRoutes, publicRoutes            } from '../routes';

const RootRouter: FC = (): any => {
    
    const success = useSelector((state: any) => {
        return state.authenticationReducer.success;
    });

    return success
    ?
        (
            <Switch>
                {
                    privateRoutes.map(({path, component}: RouteAttributes, index: number) => 
                        <Route 
                            key={index}
                            path={path} 
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
                    publicRoutes.map(({path, component}: RouteAttributes, index: number) => 
                        <Route 
                            key={index}
                            path={path}
                            component={component} 
                        />
                    )
                }
                <Redirect to={AUTHENTICATION_ROUTE} />
            </Switch>
        );
};

export default RootRouter;