import { FC    } from 'react';
import { Props } from './Menu.interface';
import './Menu.css';

//* FONTAWESOME
import { FontAwesomeIcon                } from '@fortawesome/react-fontawesome';
import { faHistory, faUserFriends       } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';

//* COMPONENTS
import Button from '../../components/Button/Button';
import Input  from '../../components/Input/Input';

//* LAYAOUTS
import MenuHeader from './MenuHeader/MenuHeader';
import MenuSearch from './MenuSearch/MenuSearch';

const Menu: FC <Props> = ({}) => {
    
    // const CONTENT_BUTTONS = (
    //     [faHistory, faUserFriends, faAddressBook, faClipboardList]
    //     .map((icon, index) =>
    //         <li className="content__button" key={index}>
    //             <Button>
    //                 <FontAwesomeIcon className="menu__icon icon" icon={icon}/>
    //             </Button>
    //         </li>
    //     )
    // );

    // const SEARCH_INPUT = (
    //     <div className="input-search-wrapper">
    //         <Button className="input-search-icon">
    //             <FontAwesomeIcon className="menu__icon icon" icon={faSearch}/>
    //         </Button>
    //         <Input className="input-search" placeholder="Search here..."/>
    //     </div>
    // );

    return (
        <section className="menu">
            <div className="menu__inner">
                <MenuHeader />
                <MenuSearch />
            </div>
        </section>
    );
};

export default Menu;