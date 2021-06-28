import { FC, useEffect              } from 'react';
import { useDispatch, useSelector   } from 'react-redux';
import { requestTokenCheck          } from '../../redux/actionCreators/authentication';
import './Messenger.css';

import Menu from '../../layouts/Menu/Menu';
import Chatroom from '../../layouts/Chatroom/Chatroom';
import Information from '../../layouts/Information/Information';

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
        dispatch(requestTokenCheck(token));    
    }, []);

    return (
        <main className="main main_two-windows">
            <Menu />
            <Chatroom />
            {/* <Information /> */}
        </main>
    );
};

export default Messenger;