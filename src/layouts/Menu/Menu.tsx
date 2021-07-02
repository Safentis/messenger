import { FC                         } from 'react';
import { Props, Switches, Controls  } from './Menu.interface';
import './Menu.css';


import { useDispatch                } from 'react-redux';
import { Link, useRouteMatch        } from 'react-router-dom';
import { FontAwesomeIcon            } from '@fortawesome/react-fontawesome';
import { faHistory, faUserFriends   } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList, faArchive } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt               } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle, faEllipsisV  } from '@fortawesome/free-solid-svg-icons';
import { requestExitingApp          } from '../../redux/actionCreators/authentication';

import Button                         from '../../components/Button/Button';
import Search                         from '../../components/Search/Search'; 

const Menu: FC <Props> = ({}): any => {
    const dispatch: any = useDispatch();

    //* App exit handler
    const handleExit = () => {
        dispatch(requestExitingApp());
    }

    const controls: Controls[] = [
        { icon: faPlusCircle, size: '2x', handler: () => null },
        { icon: faEllipsisV,  size: 'lg', handler: () => null },
        { icon: faSignOutAlt, size: 'lg', handler: handleExit },
    ];

    const CONTROLS: any = (
        controls
            .map(({icon, size, handler}: Controls, index: number) => 
                <li className="controls__item" key={index}>
                    <Button className="controls__button" type="button" onClick={handler}>
                        <FontAwesomeIcon className="icon_white" 
                            icon={icon}
                            size={size}
                        />
                    </Button>
                </li>
            )
    );

    //* Url for links
    const { url }: { url: string } = useRouteMatch();

    const switches: Switches[] = [
        { path: 'actives',   icon: faHistory      , url },
        { path: 'dialogs',   icon: faUserFriends  , url },
        { path: 'saved',     icon: faClipboardList, url },
        { path: 'complited', icon: faArchive      , url }, 
    ];

    const SWITCH: any = (
        switches
            .map(({ icon, url, path }: Switches, index: number) => 
                <li className="switch__item" key={index}>
                    <Link className="switch__link" to={`${url}/${path}`}>
                        <FontAwesomeIcon 
                            className="icon icon_white" 
                            icon={icon}
                        />
                    </Link>
                </li> 
        )
    );

    return (
        <section className="menu">
            <div className="menu__header">
                <div className="menu__header-top">
                    <h2 className="logo menu__logo">
                        WEHELP
                    </h2>
                    <ul className="controls menu__controls">
                        {CONTROLS}
                    </ul>
                </div>
                <div className="menu__header-middle">
                    <Search className="menu__search"/>
                </div>
                <div className="menu__header-bottom">
                    <ul className="switches">
                        {SWITCH}
                    </ul>
                </div>
            </div>
            <div className="menu__content">
                            
            </div>
        </section>
    );
};

export default Menu;