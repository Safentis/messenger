import { FC                            } from 'react';
import { Props                         } from './MenuTabs.interface';
import { Link, useRouteMatch           } from "react-router-dom";
import './MenuTabs.css';

//* FONTAWESOME
import { FontAwesomeIcon                } from '@fortawesome/react-fontawesome';
import { faHistory, faUserFriends       } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const MenuTabs: FC <Props> = ({className = ''}): any => {
    const { url }: any = useRouteMatch();
    const tabs   : any = {
        history: faHistory,
        dialogs: faUserFriends,
        addresses: faAddressBook,
        clipboard: faClipboardList
    };

    return (
        <ul className={"tabs " + className}>
            {
                Object
                    .entries(tabs)
                    .map(([path, icon]: any[], index: number): any => 
                        <Link 
                            className="tabs__button" 
                            to={`${url}/${path}`} 
                            key={index}
                        >
                            <FontAwesomeIcon 
                                className="icon icon_white tabs__icon" 
                                icon={icon}
                            />
                        </Link>
                    )
            }
        </ul>
    );
};

export default MenuTabs;