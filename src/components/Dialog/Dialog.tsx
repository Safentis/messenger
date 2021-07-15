import { FC          } from 'react';
import { Props       } from './Dialog.interface';
import Avatar          from '../Avatar/Avatar';
import useLastActivity from '../../Hooks/useLastActivity';
import './Dialog.css';

const Dialog: FC <Props> = ({children, client, messages}) => {

    //* -------------------------------------------------------------------
    //* Content of the dialog
    const allMessages  : any[]  = Object.values(messages);
    const lastIndex    : number = allMessages.length - 1;
    const lastContent  : string = allMessages[lastIndex].content;
    const lastTimestamp: string = allMessages[lastIndex].timestamp;
    const lastWritter  : string = allMessages[lastIndex].writtenBy;

    
    //* -------------------------------------------------------------------
    //* Library moment and correct a date
    const lastActivity = useLastActivity(lastTimestamp);

    return (
        <>
            <div className="dialog">
                <div className="dialog__inner">
                    <div className="dialog__client">
                        <Avatar className="dialog__avatar"/>
                        <p className="dialog__name">
                            {client}
                        </p>
                    </div>
                    <div className="dialog__content">
                        <p className="dialog__author">
                            {lastWritter}:
                        </p>
                        <p className="dialog__message">
                            {lastContent}
                        </p>
                    </div>
                    <div className="dialog__controls">
                        <p className="dialog__activity">
                            {lastActivity}
                        </p>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dialog;