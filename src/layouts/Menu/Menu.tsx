import { FC                        } from 'react';
import { Props, Switches, Controls } from './Menu.interface';
import './Menu.css';

import { Link, useRouteMatch       } from 'react-router-dom';
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { 
    faPlusCircle, 
    faEllipsisV,
    faHistory,
    faUserFriends,
    faClipboardList,
    faArchive    
} from '@fortawesome/free-solid-svg-icons';

import Button                        from '../../components/Button/Button';
import Search                        from '../../components/Search/Search'; 

const Menu: FC <Props> = ({}): any => {
    const { url }: { url: string } = useRouteMatch();
    
    //* -------------------------------------------------------------
    //* The buttons for menu
    const controls: Controls = {
        '2x': faPlusCircle, 
        'lg': faEllipsisV,
    };
    
    const BUTTONS: any = (
        Object
            .entries(controls)
            .map(([size, icon]: [any, any], index: number) => 
                <li className="controls__item" key={index}>
                    <Button className="controls__button" type="button">
                        <FontAwesomeIcon className="icon_white" 
                            icon={icon}
                            size={size}
                        />
                    </Button>
                </li>
            )
    );

    //* -------------------------------------------------------------
    //* The Switches links for menu
    const swithes: Switches = {
        actives  : faHistory,
        dialogs  : faUserFriends,
        saved    : faClipboardList,
        complited: faArchive
    }
    
    const SWITHES: any = (
        Object
            .entries(swithes)
            .map(([key, value]: [string, any], index: number) =>
                <li className="switch__item" key={index}>
                    <Link className="switch__link" to={`${url}/${key}`}>
                        <FontAwesomeIcon 
                            className="icon icon_white" 
                            icon={value}
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
                        {BUTTONS}
                    </ul>
                </div>
                <div className="menu__header-middle">
                    <Search className="menu__search"/>
                </div>
                <div className="menu__header-bottom">
                    <ul className="switch menu__switch">
                        {SWITHES}
                    </ul>
                </div>
            </div>
            <div className="menu__content">

            </div>
        </section>
    );
};

export default Menu;