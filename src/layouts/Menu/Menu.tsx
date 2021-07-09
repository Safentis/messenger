import { FC, useState               } from 'react';
import { Props, Switches, Controls  } from './Menu.interface';
import './Menu.css';


import { useDispatch                } from 'react-redux';
import { Link, useRouteMatch        } from 'react-router-dom';
import { useLocation                } from 'react-router-dom';
import { FontAwesomeIcon            } from '@fortawesome/react-fontawesome';
import { faHistory, faUserFriends   } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList, faArchive } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt               } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle               } from '@fortawesome/free-solid-svg-icons';
import { requestExitingApp          } from '../../redux/actionCreators/authentication';

import Content                        from './Content/Content';
import Button                         from '../../components/Button/Button';
import Search                         from '../../components/Search/Search'; 
import Submenu                        from '../../components/Submenu/Submenu';
import Profile                        from '../Profile/Profile';

const Menu: FC <Props> = ({}): any => {

    const [isSubmenu, setSubmenu]: [boolean, Function] = useState(false);

    const handleSubmenu = (): void => {
        setSubmenu(!isSubmenu);
    }

    const dispatch: any = useDispatch();

    //* App exit handler
    const handleExit = () => {
        dispatch(requestExitingApp());
    }

    //* Url for links
    const { url      }: { url: string      } = useRouteMatch();
    const { pathname }: { pathname: string } = useLocation();

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
                            className={(new RegExp(path).test(pathname)) ? 'icon icon_active' : 'icon icon_white' } 
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
                        <li className="controls__item">
                            <Button className="controls__button" type="button">
                                <FontAwesomeIcon className="icon_white" 
                                    icon={faPlusCircle}
                                    size={'2x'}
                                />
                            </Button>
                        </li>
                        <Submenu className="controls__item controls__submenu" isSubmenu={isSubmenu} handleSubmenu={handleSubmenu}>
                            <Button className="controls__button controls__submenu-button" type="button" onClick={handleExit}>
                                <FontAwesomeIcon className="icon_white" 
                                    icon={faSignOutAlt}
                                    size={'lg'}
                                />
                            </Button>
                            <Profile />  
                        </Submenu>
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
                <Content />         
            </div>
        </section>
    );
};

export default Menu;