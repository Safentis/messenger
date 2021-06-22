import { FC                                     } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { tabsRoutes, RouteAttributes            } from '../../routes';

const MenuRoutes: FC = (): any => {
    const { path: basepath }: any = useRouteMatch();
    
    return (
        <Switch>
            {
                tabsRoutes.map(({path, component}: RouteAttributes, index: number) => 
                    <Route 
                        path={basepath + path} 
                        key={index} 
                        component={component} 
                    />
                )
            }      
            <Redirect to={basepath + '/dialogs'}/>
        </Switch>
    );
};

export default MenuRoutes;