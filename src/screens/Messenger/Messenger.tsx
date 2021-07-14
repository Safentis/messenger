import { FC, useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTokenCheck        } from '../../redux/actionCreators/authentication';
import { requestDialogs           } from '../../redux/actionCreators/dialogs';
import Aside                        from '../../layouts/Aside/Aside';
import MessengerRoutes              from './MessengerRoutes';
import './Messenger.css';

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


    //* --------------------------------------------------------------------
    //* We get of the all dialogs from database and saves them to store
    useEffect(() => {
        dispatch(requestDialogs());
    }, [])

    return (
        <div className="messenger">
            <Aside />
            <MessengerRoutes />             
        </div>
    );
};

export default Messenger;