import { FC                } from 'react';
import { Props             } from './MenuControl.interface';
import { FontAwesomeIcon   } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import './MenuControl.css';

const MenuControl: FC <Props> = ({path, icon}): any => {
    const { pathname }: any = useLocation();
    const regExp: RegExp = new RegExp(path);
    
    //* If pathes are equals, 
    //* that we add of the active class
    const active: string = (
        (regExp.test(pathname)) 
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