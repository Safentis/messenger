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
import { requestUpdate            } from '../../redux/actionCreators/menudialogs';

const Dialog: FC <Props> = ({chatId, client, messages, online, operatorId, status, score = 1}): any => {
    
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
    let scoreArr    : any[];

    if (messages?.length > 0) {
        lastMessage  = messages.length - 1;
        content      = messages[lastMessage].content.slice(0, 33) + '...';
        timestamp    = messages[lastMessage].timestamp;
        date         = moment(timestamp);
        lastActivity = date.fromNow()
        scoreArr     = [...Array(score).keys()] 
    } else {
        lastMessage  = 0;
        content      = 'no messages';
        lastActivity = '';
        scoreArr     = [];
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


    let SUBMENU: any;
    let STARS: any;

    if (status === 'noactive') {
        SUBMENU = (
            <Submenu>
                <Link to={`${url}/${chatId}`} onClick={handleActive}>
                    <FontAwesomeIcon className="icon icon_white" icon={faUserEdit}/>
                </Link>
            </Submenu>
        );

    } else if (status === 'active') {
        SUBMENU = (
            <Submenu>
                <Link to={`${url}/${chatId}`} onClick={handleActive}>
                    <FontAwesomeIcon className="icon icon_white" icon={faUserEdit}/>
                </Link>
                <Button onClick={handleSave}>
                    <FontAwesomeIcon className="icon icon_white" icon={faSave}/>
                </Button>
            </Submenu>
        );
    } else if (status === 'saved') {
        SUBMENU = (
            <Submenu>
                <Link to={`${url}/${chatId}`} onClick={handleSave}>
                    <FontAwesomeIcon className="icon icon_white" icon={faUserEdit}/>
                </Link>
                <Button onClick={handleDelete}>
                    <FontAwesomeIcon className="icon icon_white" icon={faUserTimes}/>
                </Button>
            </Submenu>
        );
    } else if (status === 'complited') {
        STARS = (
            <ul className="dialog__stars stars">
                {scoreArr.map((item: number, index: number) =>
                    <li className="stars__item"  key={index}>
                        <FontAwesomeIcon 
                            className="stars__icon" 
                            icon={faStar}
                        />
                    </li>
                )}
            </ul>
        );
    } else {
        
    }

    return (
        chatId
            ? <section className="dialog">
                <Avatar className="dialog__avatar" width="50" height="50">
                    <Status className="dialog__avatar-online" status={online}/>
                </Avatar>
                <div className="dialog__info">
                    <h2 className="dialog__client">
                        {client}
                    </h2>
                    {
                        status === 'complited' 
                            ? STARS 
                            : <p className="dialog__message">{content}</p>
                    }                    
                    <p className="dialog__last-activity">
                        {lastActivity}
                    </p>
                </div>
                {SUBMENU}
              </section>
            : null
    );
};

export default Dialog;