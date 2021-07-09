import { FC, useEffect              } from 'react';
import { useDispatch, useSelector   } from 'react-redux';
import { requestTokenCheck          } from '../../redux/actionCreators/authentication';
import './Messenger.css';
import { usePubNub                  } from 'pubnub-react';


import { requestAvatar              } from '../../redux/actionCreators/menudialogs';
import Menu                           from '../../layouts/Menu/Menu';
import ChatroomRoutes                 from '../../layouts/Chatroom/ChatroomRoutes';

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


    const pubnub: any = usePubNub();
    const uid: string = useSelector((state: any) => {
        return state.menudialogsReducer.uid;
    });
    
    pubnub.setUUID(uid);

    useEffect(() => {
        dispatch(
            requestAvatar(
                uid
            )
        );
    }, [])

    return (
        <main className="main main_two-windows">
            <Menu />
            <ChatroomRoutes />
        </main>
    );
};

export default Messenger;