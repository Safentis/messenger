import { FC } from 'react';
import './Messenger.css';

//* COMPONENTS
import Menu from '../../layouts/Menu/Menu';
import Home from '../../layouts/Home/Home';

const Messenger: FC = (): any => {
    return (
        <div className="messenger">
            <Menu>
                
            </Menu>
            <Home />
        </div>
    );
};

export default Messenger;