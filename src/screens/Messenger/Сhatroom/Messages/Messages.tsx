import { FC    } from 'react';
import { Props } from './Messages.interface';
import './Messages.css';

const Messages: FC <Props> = ({children, className = ''}) => {
    return (
        <div className={"messages " + className}>
            <div className="messages__inner">
                {children}
            </div>
        </div>
    );
};

export default Messages;