import React from 'react';
import './Messenger.css';

//* COMPONENTS
import Menu from '../../layouts/Menu/Menu';
import Home from '../../layouts/Home/Home';

const Messenger = (): any => {
    return (
        <div className="messenger">
            <Menu />
            <Home />
        </div>
    );
};

export default Messenger;