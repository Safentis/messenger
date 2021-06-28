import { FC    } from 'react';
import { Props } from './Chatroom.interface';
import './Chatroom.css';

import Namebar   from '../../components/Namebar/Namebar';
import Message   from '../../components/Message/Message';
import TextField from '../../components/TextField/TextField';


const Chatroom: FC <Props> = (): any => {
    return (
        <section className="chatroom">
            <div className="chatroom__header">
                <Namebar />
            </div>
            <div className="chatroom__body">
                <Message />
            </div>
            <div className="chatroom__footer">
                <TextField />
            </div>
        </section>
    );
};

export default Chatroom;