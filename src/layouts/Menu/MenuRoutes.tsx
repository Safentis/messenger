import { FC                                     } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { tabsRoutes, RouteAttributes            } from '../../routes';

const MenuRoutes: FC = (): any => {
    const { url }: any = useRouteMatch();

    return (
        <Switch>
            {
                tabsRoutes.map(({path, component}: RouteAttributes, index: number) => 
                    <Route 
                        path={url + path} 
                        key={index} 
                        component={component} 
                    />
                )
            }
                  
            <Redirect to={url + '/dialogs'}/>
        </Switch>
    );
};

export default MenuRoutes;