import { FC                       } from 'react';
import { useEffect                } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAllDialogs        } from '../../redux/actionCreators/dialogs';
import { requestTokenCheck        } from '../../redux/actionCreators/authentication';
import Menu                         from '../../layouts/Menu/Menu';
import MessengerRoutes              from './MessengerRoutes';
import firebase                     from 'firebase';
import './Messenger.css';

const Messenger: FC = (): any => {
    const dispatch: any = useDispatch();
    const token: string = useSelector(({authenticationReducer}: any) => authenticationReducer?.token);
    const chatsRef: any = firebase.database().ref('chatrooms');
    
    useEffect(() => {
        chatsRef.on('value', (dataSnapshot: any) => {
            dispatch(requestAllDialogs(dataSnapshot.val()));
        });
    }, []);

    //* If user's token is not valid, 
    //* we redirect user to the authentication page
    useEffect(() => {
        dispatch(
            requestTokenCheck(
                token
            )
        );
    }, []);
    
    return (
        <div className="messenger">
            <Menu />
            <MessengerRoutes />
        </div>
    );
};

export default Messenger;