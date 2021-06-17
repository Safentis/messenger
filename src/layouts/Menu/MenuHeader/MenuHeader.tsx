import { FC    } from 'react';
import { Props } from './MenuHeader.interface'
import './MenuHeader.css';

//* COMPONENTS
import Button    from '../../../components/Button/Button';

//* FONTAWESOME
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt              } from '@fortawesome/free-solid-svg-icons';

//*REDUX
import { useDispatch } from 'react-redux';
import { exitingTheApplication } from '../../../redux/actionCreators/authentication';

const MenuHeader: FC <Props> = ({className = ''}): any => {
   
    const dispatch = useDispatch();
    const handleExit = () => dispatch(exitingTheApplication());

    return (
        <div className={"header " + className}>
            <h2 className="header__title">
                Wehelp
            </h2>
            <ul className="header__controls controls">
                <li className="controls__button">
                    <Button className="menu__button-add-user">
                        <FontAwesomeIcon className="icon icon_white menu__icon_plus " icon={faPlusCircle}/>
                    </Button>
                </li>
                <li className="controls__button">
                    <Button className="menu__button-exit">
                        <FontAwesomeIcon className="icon icon_white menu__icon_plus " icon={faSignOutAlt} onClick={handleExit}/>
                    </Button>
                </li>
                <li className="controls__button">
                    <Button className="menu__button-options">
                        <FontAwesomeIcon className="icon icon_white menu__icon_dots" icon={faEllipsisV}/>
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default MenuHeader;