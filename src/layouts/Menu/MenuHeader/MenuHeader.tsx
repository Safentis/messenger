import React  from 'react';
import Button from '../../../components/Button/Button';
import './MenuHeader.css';

//* FONTAWESOME
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const MenuHeader = (): any => {
    return (
        <div className="header">
            <h2 className="header__title">
                Wehelp
            </h2>
            <ul className="header__controls controls">
                <li className="controls__button">
                    <Button>
                        <FontAwesomeIcon className="menu__icon menu__icon_plus icon" icon={faPlusCircle}/>
                    </Button>
                </li>
                <li className="controls__button">
                    <Button>
                        <FontAwesomeIcon className="menu__icon menu__icon_dots icon" icon={faEllipsisV}/>
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default MenuHeader;