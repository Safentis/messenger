import React from 'react';
import './Messenger.css';

//* COMPONENTS
import Dialogs  from './Dialogs/Dialogs';
import Wellcome from './Wellcome/Wellcome';

const Messenger = (): any => {
    return (
        <div className="main__messenger-container">
            <Dialogs />
            <Wellcome />
        </div>
    );
};

export default Messenger;