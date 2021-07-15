import { FC, useState                            } from 'react';
import { useSelector                             } from 'react-redux';
import { Route, Switch, Redirect, useRouteMatch  } from 'react-router-dom';
import { usePubNub                               } from 'pubnub-react';
import { messengerRoutes                         } from '../../routes';
import { MESSENGER_ROUTE                         } from '../../utils/consts';

interface Routes {
    path: string
    component: any
}

const MessengerRoutes: FC = () => {

    //* -----------------------------------------------------
    //* We get of the all dialogs and user information
    const { dialogs, user } = useSelector((state: any) => {
        return {
            dialogs: state.dialogsReducer.filtered,
            user   : state.userReducer.user,
        };
    });


    //* -----------------------------------------------------
    //* Base URL for routes
    const { url }: any = useRouteMatch();
    
    
    //* -----------------------------------------------------
    //* Set UUID for pubnub
    const pubnub = usePubNub();
    pubnub.setUUID(user.uid); 

    return (
        <Switch>
            {messengerRoutes.map(({path, component: Component}: Routes, index: number) =>
                <Route 
                    path={(MESSENGER_ROUTE === path) ? path : url + path} 
                    exact={true}
                    key={index}  
                >
                    <Component dialogs={dialogs} user={user}/>
                </Route>
            )}
            <Redirect to={MESSENGER_ROUTE} />
        </Switch>
    );
}

export default MessengerRoutes;