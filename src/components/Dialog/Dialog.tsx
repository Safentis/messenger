import { FC                  } from 'react';
import { Props               } from './Dialog.interface';
import './Dialog.css';

import { useDispatch         } from 'react-redux';
import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import { faStar              } from '@fortawesome/free-solid-svg-icons';
import moment                  from 'moment';
import Avatar                  from '../Avatar/Avatar';
import Status                  from '../Status/Status';
import Button                  from '../Button/Button';
import { 
    Link, 
    useLocation, 
    useRouteMatch   
} from 'react-router-dom';
import { 
    requestActiveDialog, 
    requestDeleteDialog, 
    requestSaveDialogs 
} from '../../redux/actionCreators/dialogs';

const Dialog: FC <Props> = (dialog): any => {
    const {
        client, messages, operatorId, 
        status, online, chatId, timestamp,
        score
    }: Props = dialog;


    const lastMessage: number = messages.length - 1;
    const content    : string = messages[lastMessage].content;
    
    const { pathname }: any = useLocation();
    const { url      }: any = useRouteMatch()
    const regExp      : RegExp = new RegExp(chatId);
    const classActive : string = regExp.test(pathname) ? 'dialog_active' : '';
    
    const date: any = moment(timestamp);
    const lastActivity: number = date.fromNow();
    
    const dispatch = useDispatch();
    const handleDialogs = (): void => {
        dispatch(requestActiveDialog(chatId));  
      }

    const handleSave = () => {
        dispatch(
            requestSaveDialogs(dialog)
        );
    };

    const handleDelete = () => {
        dispatch(
            requestDeleteDialog(chatId)
        );
    }

    let BUTTON: any;

    if (url === '/messenger/saved') {
        BUTTON = (
            <Button className="dialog__button" onClick={handleDelete} title="Save dialog">
                <FontAwesomeIcon className="icon icon_white dialog__button-icon" icon={faTrashAlt}/>
            </Button>
        );
    }
    if (url === '/messenger/dialogs' || url === '/messenger/history') {
        BUTTON = (
            <Button className="dialog__button" onClick={handleSave} title="Save dialog">
                <FontAwesomeIcon className="icon icon_white dialog__button-icon" icon={faPlus}/>
            </Button>
        );
    }
    if (url === '/messenger/clipboard') {
        const stars = [];
        let i = 0;

        while (i < score) {
            i++;
            stars.push(<FontAwesomeIcon icon={faStar}/>);
        }

        BUTTON = (
            stars.map((item) => item)
        )
    }

    return (
        <div className={"dialog " + classActive}>
            <Link className="dialog__inner" to={`${url}/${chatId}`} onClick={handleDialogs}>
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
                    <p className="dialog__last-activity">
                        Last message {lastActivity}
                    </p>
                </div>
            </Link>
            <div>
                <div className="dialog__functionality">
                    {BUTTON}
                </div>
            </div>
        </div>
    );
};

export default Dialog;