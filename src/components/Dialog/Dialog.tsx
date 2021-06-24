import { FC              } from 'react';
import { Props           } from './Dialog.interface';
import './Dialog.css';

import { useLocation     } from 'react-router-dom';
import Avatar              from '../Avatar/Avatar';
import Status              from '../Status/Status';

const Dialog: FC <Props> = ({client, messages, operatorId, status, online, chatId}): any => {
    const lastMessage: number = messages.length - 1;
    const content    : string = messages[lastMessage].content;
    
    const { pathname }: any = useLocation();
    const regExp      : RegExp = new RegExp(chatId);
    const classActive : string = regExp.test(pathname) ? 'dialog_active' : '';

    return (
        <div className={"dialog " + classActive}>
            <div className="dialog__inner">
                <Avatar className="dialog__avatar" width="50" height="50">
                    <Status className="dialog__avatar-status" online={online}/>
                </Avatar>
                <div className="dialog__content">
                    <p className="dialog__username">
                        {client}
                    </p>
                    <p className="dialog__message">
                        {content.slice(0, 33)}...
                    </p>
                </div>
                <p className="dialog__newmessage-counter">
                    <span className="dialog__newmessage-value">
                        {12}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Dialog;