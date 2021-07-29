import { FC, useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase                     from 'firebase';
import MessengerRoutes              from './MessengerRoutes';
import Aside                        from '../../layouts/Aside/Aside';
import { requestDialogs           } from '../../redux/actionCreators/dialogs';
import { setFilteredDialogs       } from '../../redux/actionCreators/dialogs';
import { requestUser              } from '../../redux/actionCreators/user';
import { requestTokenCheck        } from '../../redux/actionCreators/authentication';
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
    //* and create long connection
    useEffect(() => {
        let database : any = firebase.database();
        let chatrooms: any = database.ref('chatrooms');

        chatrooms.on('value', (snapshot: any) => {
            let dialogs: any = snapshot.val();

            dispatch(requestDialogs(dialogs));
            dispatch(setFilteredDialogs(dialogs));
        });
    }, []);


    //* --------------------------------------------------------------------
    //* We get of the users information
    useEffect(() => {
        firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user) {
                dispatch(requestUser({user}));
            }
        });
    }, []);

    return (
        <div className="messenger">
            <Aside>
                
            </Aside>
            <MessengerRoutes />             
        </div>
    );
};

export default Messenger;
