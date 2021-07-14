import { FC                  } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    MENU_CONTENT_ACTIVES, 
    MENU_CONTENT_COMPLITED, 
    MENU_CONTENT_NOACTIVES, 
    MENU_CONTENT_SAVED
} from '../../utils/consts';

import './Aside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory       } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends   } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faArchive       } from '@fortawesome/free-solid-svg-icons';

const Aside: FC = () => {

    //* ------------------------------------
    //* URL's for links
    const { url } = useRouteMatch();
    const ACTIVES  : string = url + MENU_CONTENT_ACTIVES;
    const COMPLITED: string = url + MENU_CONTENT_COMPLITED;
    const SAVED    : string = url + MENU_CONTENT_SAVED;
    const NOACTIVES: string = url + MENU_CONTENT_NOACTIVES;

    return (
        <section className="aside">
            <div className="aside__inner">
                <div className="aside__header">
                    <h2 className="aside__title">
                        Wehelp
                    </h2>
                </div>
                <div className="aside__body">
                    <ul className="controls aside__controls">
                        <li className="controls__button">
                            <Link to={ACTIVES}>
                                <FontAwesomeIcon 
                                    className="icon icon_white controls__icon" 
                                    icon={faHistory}
                                />
                                actives
                            </Link>
                        </li>
                        <li className="controls__button">
                            <Link to={NOACTIVES}>
                                <FontAwesomeIcon 
                                    className="icon icon_white controls__icon" 
                                    icon={faUserFriends}
                                />
                                noactives
                            </Link>
                        </li>
                        <li className="controls__button">
                            <Link to={SAVED}>
                                <FontAwesomeIcon 
                                    className="icon icon_white controls__icon" 
                                    icon={faClipboardList}
                                />
                                saved
                            </Link>
                        </li>
                        <li className="controls__button">
                            <Link to={COMPLITED}>
                                <FontAwesomeIcon 
                                    className="icon icon_white controls__icon" 
                                    icon={faArchive}
                                />
                                complited
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Aside;