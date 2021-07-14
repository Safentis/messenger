import { FC,                                     } from 'react';
import { useSelector                             } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch  } from 'react-router-dom';
import { messengerRoutes                         } from '../../routes';
import { MESSENGER_ROUTE                         } from '../../utils/consts';

interface Routes {
    path: string
    component: any
}

const MessengerRoutes: FC = () => {

    //* -----------------------------------------------------
    //* We get of the all filtered dialogs
    const dialogs = useSelector((state: any) => {
        return state.dialogsReducer.filtered;
    });

    //* ------------------------------------------------------
    //* Base URL for routes
    const { url } = useRouteMatch();

    return (
        <Switch>
            {messengerRoutes.map(({path, component: Component}: Routes, index: number) =>
                <Route 
                    path={(MESSENGER_ROUTE === path) ? path : url + path} 
                    exact={true}
                    key={index}  
                >
                    <Component dialogs={dialogs}/>
                </Route>
            )}

            {/* If path is no correct we redirect user to home page*/}
            <Redirect to={MESSENGER_ROUTE} />
        </Switch>
    );
}

export default MessengerRoutes;