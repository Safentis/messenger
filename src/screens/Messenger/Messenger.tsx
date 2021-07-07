import { FC, useEffect, useState    } from 'react';
import { useDispatch, useSelector   } from 'react-redux';
import { requestTokenCheck          } from '../../redux/actionCreators/authentication';
import './Messenger.css';

import firebase                       from 'firebase';
import Menu                           from '../../layouts/Menu/Menu';
import ChatroomRoutes                 from '../../layouts/Chatroom/ChatroomRoutes';
import Information                    from '../../layouts/Information/Information';

const Messenger: FC = (): any => {
    
    //* --------------------------------------------------------------------
    //* We take of the token from the gloabal state by name storage
    //* if component mounted, we test of the token, and if token is not valid
    //* we exiting from account
    const dispatch: any = useDispatch();
    const token: string = useSelector((state: any) => {
        return state.authenticationReducer.token; 
    });

    useEffect(() => {
        // dispatch(requestTokenCheck(token));    
    }, []);
    

    return (
        <main className="main main_two-windows">
            <Menu />
            <ChatroomRoutes />
        </main>
    );
};

export default Messenger;