import { FC    } from 'react';
import { Props } from './MenuHeader.interface'
import './MenuHeader.css';

//* COMPONENTS
import Button    from '../../../components/Button/Button';

//* FONTAWESOME
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const MenuHeader: FC <Props> = ({className = ''}): any => {
    return (
        <div className={"header " + className}>
            <h2 className="header__title">
                Wehelp
            </h2>
            <ul className="header__controls controls">
                <li className="controls__button">
                    <Button className="menu__button-add-user">
                        <FontAwesomeIcon className="menu__icon menu__icon_plus icon" icon={faPlusCircle}/>
                    </Button>
                </li>
                <li className="controls__button">
                    <Button className="menu__button-options">
                        <FontAwesomeIcon className="menu__icon menu__icon_dots icon" icon={faEllipsisV}/>
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default MenuHeader;