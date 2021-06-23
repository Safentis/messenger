import { FC                             } from 'react';
import { Props, Controls                } from './MenuControls.interface';
import { useRouteMatch                  } from 'react-router-dom';
import { faHistory, faUserFriends       } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import MenuControl                        from './MenuControl/MenuControl';
import './MenuControls.css';

const MenuControls: FC <Props> = ({className = ''}): any => {
    const { url }: any = useRouteMatch();
    
    //* Tab`s path and icon
    const controls: Controls = {
        history  : faHistory,
        dialogs  : faUserFriends,
        addresses: faAddressBook,
        clipboard: faClipboardList
    };
    
    return (
        <ul className={"controls " + className}>
            {
                Object
                    .entries(controls)
                    .map(([path, icon]: any[], index: number): any =>
                        <MenuControl 
                            path={`${url}/${path}`} 
                            icon={icon}
                            key={index}
                        />
                    )
            }
        </ul>
    );
};

export default MenuControls;