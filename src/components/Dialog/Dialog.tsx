import { FC, useState             } from 'react';
import { Props                    } from './Dialog.interface';
import './Dialog.css';

import { FontAwesomeIcon          } from '@fortawesome/react-fontawesome';
import { faStar, faUserEdit       } from '@fortawesome/free-solid-svg-icons';
import { faSave, faEdit           } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes              } from '@fortawesome/free-solid-svg-icons';
import { requestUpdate            } from '../../redux/actionCreators/menudialogs';

import { Link, useRouteMatch      } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment                       from 'moment';
import Avatar                       from '../Avatar/Avatar';
import Status                       from '../Status/Status';
import Button                       from '../Button/Button';
import Submenu                      from '../Submenu/Submenu';
import Stars                        from '../Stars/Stars';


const Dialog: FC <Props> = ({ chatId, client, messages = [], online, status, score, operatorId }): any => {
    
    const { url  }: any    = useRouteMatch();
    const dispatch: any    = useDispatch()
    const uid     : string = useSelector((state: any) => {
        return state.menudialogsReducer.uid;
    }) 


    const [isSubmenu, setSubmenu]: [boolean, Function] = useState(false);

    const handleSubmenu = (): void => {
        setSubmenu(!isSubmenu);
    }


    //* --------------------------------------------------------------------------
    //* Score of job
    const stars: number[] = [...Array(score).keys()];
    const starsContent: any = <Stars stars={stars}/>

    //* --------------------------------------------------------------------------
    //* Last message
    const mess       : any      = Object.values(messages);
    const lastIndex  : number   = mess.length - 1;
    const lastContent: any      = mess[lastIndex];
    const lastMessage: string   = lastContent.content;
    const lastPicture: string[] = lastContent.src

    //* Check of content
    const isEmptyStr : boolean  = lastMessage === ''
    const isPicture  : boolean  = lastPicture?.length > 0;
    const isComplite : boolean  = status === 'complited'; 
    const typeContent: string   = (
        isEmptyStr
            ? isPicture 
                ? 'New image' 
                : 'No messages'
            : isComplite 
                ? starsContent 
                : lastMessage.slice(0, 33) + '...'
    ); 
    
    
    
    //* --------------------------------------------------------------------------
    //* Last activity in chat
    const lastTime    : string = lastContent.timestamp;
    const dateMoment  : any    = moment(lastTime);
    const lastActivity: string = dateMoment.fromNow();


    //* --------------------------------------------------------------------------
    //* Status changes
    const statusObject: any = {
        noactive: [
            { event: 'active', type: 'link', icon: faUserEdit    },
        ],
        active  : [
            { event: 'active', type: 'link', icon: faUserEdit    }, 
            { event: 'saved', type: 'button', icon: faSave       },
        ],
        saved   : [
            { event: 'active', type: 'link', icon: faUserEdit    }, 
            { event: 'active', type: 'button', icon: faUserTimes },
        ],
        complited: [
            { event: 'active', type: 'link', icon: faUserEdit    },
        ],
    };


    const handleStatus = (event: any) => {
        handleSubmenu();
        dispatch(
            requestUpdate(
                event, 
                chatId, 
                uid
            )
        );
    }

    const SUBMENU_CONTENT: any = (
        statusObject[status].map(({event, type, icon}: any, index: number): any =>
            type === 'link'
                ? <Link 
                    key={index} 
                    to={`${url}/${chatId}`} 
                    onClick={() => status === 'noactive' && handleStatus(event)}
                    >
                    <FontAwesomeIcon 
                        className="icon icon_white" 
                        icon={icon}
                    />
                    </Link>
                : <Button 
                    key={index} 
                    onClick={() => handleStatus(event)}
                    >
                    <FontAwesomeIcon 
                        className="icon icon_white" 
                        icon={icon}
                    />
                </Button>
        )
    );

    return (
        <div className="dialog">
            <Avatar className="dialog__avatar" width="50" height="50">
                <Status className="dialog__avatar-online" status={online}/>
            </Avatar>
            <div className="dialog__info">
                <p className="dialog__client">
                    {client}
                </p>
                <div className="dialog__message">
                    {typeContent}
                </div>
                <p className="dialog__last-activity">
                    {lastActivity}
                </p>
            </div>
            <Submenu isSubmenu={isSubmenu} handleSubmenu={handleSubmenu}>
                {SUBMENU_CONTENT}
            </Submenu>
        </div>
    );
};

export default Dialog;