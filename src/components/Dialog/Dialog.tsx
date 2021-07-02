import { FC, useState             } from 'react';
import { Props                    } from './Dialog.interface';
import './Dialog.css';

import { FontAwesomeIcon          } from '@fortawesome/react-fontawesome';
import { faStar, faUserEdit       } from '@fortawesome/free-solid-svg-icons';
import { faSave                   } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes              } from '@fortawesome/free-solid-svg-icons';

import { Link, useRouteMatch      } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment                       from 'moment';
import Avatar                       from '../Avatar/Avatar';
import Status                       from '../Status/Status';
import Button                       from '../Button/Button';
import Submenu                      from '../Submenu/Submenu';
import Stars                        from '../Stars/Stars';
import { requestUpdate            } from '../../redux/actionCreators/menudialogs';

const Dialog: FC <Props> = ({chatId, client, messages, online, operatorId, status, score}): any => {
    
    const dispatch = useDispatch();
    const userUid: string = useSelector((state: any) => {
        return state.menudialogsReducer.uid;
    });

    let { url }: { url: string } = useRouteMatch();
    let lastMessage : number;
    let timestamp   : string
    let content     : string; 
    let date        : any;
    let lastActivity: string;
    let stars       : any[];

    if (messages?.length > 0) {
        lastMessage  = messages.length - 1;
        content      = messages[lastMessage].content.slice(0, 33) + '...';
        timestamp    = messages[lastMessage].timestamp;
        date         = moment(timestamp);
        lastActivity = date.fromNow()
        stars        = [...Array(score).keys()] 
    } else {
        lastMessage  = 0;
        content      = 'no messages';
        lastActivity = '';
        stars        = [];
    }

    const handleSave = () => {
        dispatch(requestUpdate('saved', chatId, userUid));
    }

    const handleActive = () => {
        dispatch(requestUpdate('active', chatId, userUid));
    }
    
    const handleDelete = () => {
        dispatch(requestUpdate('active', chatId, userUid));
    }


    let icon: any;
    let handlerClick: () => void = () => {};

    if (status === 'noactive') {
        handlerClick = handleActive;
        icon = faUserEdit;
    } else if (status === 'active') {
        handlerClick = handleSave;
        icon = faSave;
    } else if (status === 'saved') {
        handlerClick = handleDelete;
        icon = faUserTimes;
    } else {
        
    }

    let SUBMENU = (
        status === 'complited'
            ? null
            : <Submenu>
                <Button onClick={handlerClick}>
                    <FontAwesomeIcon className="icon icon_white" icon={icon}/>
                </Button>
              </Submenu>
    );

    const CONTENT: any = (
        status === 'complited' 
            ? <Stars className="dialog__stars" stars={stars}/> 
            : <p className="dialog__message">
                {content}
            </p>
        
    )

    return (
        chatId
            ? <section className="dialog">
                <Avatar className="dialog__avatar" width="50" height="50">
                    <Status className="dialog__avatar-online" status={online}/>
                </Avatar>
                <Link to={`${url}/${chatId}`} onClick={status === 'noactive' ? handleActive : () => {}}>
                    <div className="dialog__info">
                        <h2 className="dialog__client">
                            {client}
                        </h2>
                        {CONTENT}
                        <p className="dialog__last-activity">
                            {lastActivity}
                        </p>
                    </div>
                </Link>
                {SUBMENU}
              </section>
            : null
    );
};

export default Dialog;