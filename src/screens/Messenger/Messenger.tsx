import { FC                } from 'react';
import { useEffect         } from 'react';
import './Messenger.css';

//* REDUX
import { useDispatch       } from 'react-redux';
import { requestAllDialogs } from '../../redux/actionCreators/dialogs';

//* COMPONENTS
import Menu                  from '../../layouts/Menu/Menu';
import Home                  from '../../layouts/Home/Home';

const Messenger: FC = (): any => {
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(
            requestAllDialogs()
        );
    }, []);
    
    return (
        <div className="messenger">
            <Menu />
            <Home />
        </div>
    );
};

export default Messenger;