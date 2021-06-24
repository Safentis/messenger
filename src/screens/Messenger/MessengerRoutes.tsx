import { FC                                     } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { messengerRoutes, RouteAttributes       } from '../../routes';

const MessengerRoutes: FC = (): any => {
    const { url }: any = useRouteMatch();
    
    return (
        <>
            <Switch>
                {
                    messengerRoutes.map(({path, component}: RouteAttributes, index: number) => 
                        <Route 
                            exact
                            path={url + path} 
                            key={index} 
                            component={component} 
                        />
                    )
                }
            </Switch>
        </>
    );
};

export default MessengerRoutes;