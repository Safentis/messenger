import { FC                                     } from 'react';
import { Route, Switch, useRouteMatch, Redirect, useParams } from 'react-router-dom';
import { tabsRoutes, RouteAttributes            } from '../../routes';

const MenuRoutes: FC = (): any => {
    const { url    }: any = useRouteMatch();
    const { chatId }: any = useParams();

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