import { FC, useState, Children } from 'react';
import { Props                  } from './Submenu.interface'
import './Submenu.css';

import Button                     from '../Button/Button';
import { FontAwesomeIcon        } from '@fortawesome/react-fontawesome';
import { faTimes                } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV            } from '@fortawesome/free-solid-svg-icons';

const Submenu: FC <Props> = ({children, className = ''}): any => {
    const [isSubmenu, setSubmenu]: [boolean, Function] = useState(false);

    const handleSubmenu = (): void => {
        setSubmenu(!isSubmenu);
    }

    const icon: any = isSubmenu ? faTimes : faEllipsisV;
    const isHidenClass: string = isSubmenu 
        ? `submenu__list submenu__list_open` 
        : `submenu__list submenu__list_close`;

    const CONTENT: any = (
        Children.map((children), (item: any, index: number): any => 
            <li className="submenu__item" key={index}>
                {item}
            </li>
        )
    );

    return (
        <ul className={`submenu ${className}`}>
            <li className="submenu__button">
                <Button onClick={handleSubmenu}>
                    <FontAwesomeIcon 
                        className="icon icon_white" 
                        size="lg"
                        icon={icon}
                    />
                </Button>
            </li>
            <ul className={isHidenClass}>
                {CONTENT}
            </ul>
        </ul>
    );
};

export default Submenu;