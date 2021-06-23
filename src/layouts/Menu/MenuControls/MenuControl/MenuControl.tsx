import { FC                } from 'react';
import { Props             } from './MenuControl.interface';
import { FontAwesomeIcon   } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import './MenuControl.css';

const MenuControl: FC <Props> = ({path, icon}): any => {
    const { pathname }: any = useLocation();
    
    //* If pathes are equals, 
    //* that we add of the active class
    const active: string = (
        (pathname === path) 
            ? 'icon_active' 
            : 'icon_white'
    );

    return (
        <li className="controls__item">
            <Link className="controls__button" to={path}>
                <FontAwesomeIcon 
                    className={"icon controls__icon " + active} 
                    icon={icon}
                />
            </Link>
        </li>
    );
};

export default MenuControl;