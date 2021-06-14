import { FC    } from 'react';
import { Props } from './MenuTabs.interface';
import './MenuTabs.css';

//* COMPONENTS
import Button from '../../../components/Button/Button';

//* FONTAWESOME
import { FontAwesomeIcon                } from '@fortawesome/react-fontawesome';
import { faHistory, faUserFriends       } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const MenuTabs: FC <Props> = ({className = ''}) => {
    const icons = [
        faHistory, 
        faUserFriends, 
        faAddressBook, 
        faClipboardList
    ];
    
    return (
        <ul className={"tabs " + className}>
            {
                icons
                    .map((icon, index) =>
                        <li className="tabs__item" key={index}>
                            <Button className="tabs__button">
                                <FontAwesomeIcon 
                                    className="tabs__icon menu__icon icon" 
                                    icon={icon}
                                />
                            </Button>
                        </li>
                    )
            }
        </ul>
    );
};

export default MenuTabs;